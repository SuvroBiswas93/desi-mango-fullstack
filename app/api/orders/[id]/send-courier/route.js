import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../../lib/firebase/verifyToken";
import { generateInvoicePdfBase64 } from "../../../../../utils/serverInvoicePdf";

const requiredEnv = ["STEADFAST_BASE_URL", "STEADFAST_API_KEY", "STEADFAST_SECRET_KEY"];

const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizePhone = (phone = "") => phone.replace(/\D/g, "").slice(-11);

const buildInvoice = (order) =>
  `EA-${String(order.orderId || order._id.toString()).replace(/[^a-zA-Z0-9_-]/g, "")}`;

const buildItemDescription = (products = []) =>
  products
    .map((product) => `${product.name || "Product"} x${product.quantity || 1}`)
    .join(", ")
    .slice(0, 480);

const callSteadfastWithRetry = async (payload) => {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${process.env.STEADFAST_BASE_URL}/create_order`, {
        method: "POST",
        headers: {
          "Api-Key": process.env.STEADFAST_API_KEY,
          "Secret-Key": process.env.STEADFAST_SECRET_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.status === 200 && data?.consignment) {
        return { data, attempt };
      }

      lastError = new Error(data?.message || `SteadFast request failed: ${response.status}`);
      lastError.response = data;

      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error;
    }

    if (attempt < 3) {
      await wait(500 * attempt);
    }
  }

  throw lastError;
};

export async function POST(req, { params }) {
  try {
    await verifyFirebaseToken(req);

    const missingEnv = getMissingEnv();
    if (missingEnv.length) {
      return NextResponse.json(
        { success: false, message: `Missing courier config: ${missingEnv.join(", ")}` },
        { status: 500 },
      );
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.ORDERS);
    const orderObjectId = new ObjectId(id);
    const lockedAt = new Date();

    const lockResult = await collection.findOneAndUpdate(
      {
        _id: orderObjectId,
        status: "confirmed",
        "courier.sentAt": { $exists: false },
        $or: [
          { "courier.status": { $exists: false } },
          { "courier.status": { $in: ["failed", "send_failed"] } },
        ],
      },
      {
        $set: {
          "courier.status": "sending",
          "courier.lastAttemptAt": lockedAt,
          updatedAt: lockedAt,
        },
        $inc: { "courier.attempts": 1 },
        $push: {
          "courier.logs": {
            at: lockedAt,
            event: "send_started",
            message: "Admin requested courier send",
          },
        },
      },
      { returnDocument: "after" },
    );

    const order = lockResult?.value || lockResult;
    if (!order) {
      const existingOrder = await collection.findOne({ _id: orderObjectId });
      if (!existingOrder) {
        return NextResponse.json(
          { success: false, message: "Order not found" },
          { status: 404 },
        );
      }

      if (existingOrder.courier?.sentAt || existingOrder.courier?.consignmentId) {
        return NextResponse.json(
          { success: false, message: "This order was already sent to courier" },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { success: false, message: "Only confirmed orders can be sent to courier" },
        { status: 400 },
      );
    }

    const recipientPhone = normalizePhone(order.customer?.phone);
    if (!/^01[3-9]\d{8}$/.test(recipientPhone)) {
      throw new Error("Customer phone number is not valid for courier");
    }

    const invoice = buildInvoice(order);
    const pdfBase64 = await generateInvoicePdfBase64(order);
    const payload = {
      invoice,
      recipient_name: String(order.customer?.name || "").slice(0, 100),
      recipient_phone: recipientPhone,
      recipient_address: String(order.customer?.address || "").slice(0, 250),
      cod_amount: Number(order.total || 0),
      note: `Invoice PDF generated. Order #${order.orderId || order._id.toString()}`.slice(0, 480),
      item_description: buildItemDescription(order.products),
      total_lot: Math.max(
        1,
        (order.products || []).reduce((sum, product) => sum + (product.quantity || 1), 0),
      ),
      delivery_type: 0,
    };

    const courierResult = await callSteadfastWithRetry(payload);
    const consignment = courierResult.data.consignment;
    const sentAt = new Date();

    await collection.updateOne(
      { _id: orderObjectId },
      {
        $set: {
          status: "delivered",
          updatedAt: sentAt,
          "courier.provider": "steadfast",
          "courier.status": "sent",
          "courier.deliveryStatus": consignment.status || "in_review",
          "courier.sentAt": sentAt,
          "courier.lastAttemptAt": sentAt,
          "courier.invoice": invoice,
          "courier.requestPayload": payload,
          "courier.response": courierResult.data,
          "courier.consignmentId": consignment.consignment_id,
          "courier.trackingCode": consignment.tracking_code,
          "courier.invoicePdf": {
            fileName: `Invoice_${invoice}.pdf`,
            mimeType: "application/pdf",
            base64: pdfBase64,
            generatedAt: sentAt,
          },
        },
        $push: {
          "courier.logs": {
            at: sentAt,
            event: "send_success",
            message: courierResult.data.message || "Consignment created",
            attemptUsed: courierResult.attempt,
            consignmentId: consignment.consignment_id,
            trackingCode: consignment.tracking_code,
          },
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Order sent to courier successfully",
      consignment,
    });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    const { id } = await params;
    if (ObjectId.isValid(id)) {
      const collection = await dbConnect(collections.ORDERS);
      const failedAt = new Date();
      await collection.updateOne(
        { _id: new ObjectId(id), "courier.status": "sending" },
        {
          $set: {
            "courier.status": "failed",
            "courier.lastError": error.message || "Courier send failed",
            "courier.failedAt": failedAt,
            updatedAt: failedAt,
          },
          $push: {
            "courier.logs": {
              at: failedAt,
              event: "send_failed",
              message: error.message || "Courier send failed",
              response: error.response || null,
            },
          },
        },
      );
    }

    console.error("Courier send failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Courier send failed" },
      { status: 500 },
    );
  }
}
