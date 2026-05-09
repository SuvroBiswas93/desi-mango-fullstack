import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../../lib/firebase/verifyToken";

const requiredEnv = ["STEADFAST_BASE_URL", "STEADFAST_API_KEY", "STEADFAST_SECRET_KEY"];

const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);

const getStatusPath = (courier) => {
  if (courier?.trackingCode) return `/status_by_trackingcode/${courier.trackingCode}`;
  if (courier?.consignmentId) return `/status_by_cid/${courier.consignmentId}`;
  if (courier?.invoice) return `/status_by_invoice/${courier.invoice}`;
  return null;
};

export async function GET(req, { params }) {
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
    const order = await collection.findOne({ _id: orderObjectId });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    const statusPath = getStatusPath(order.courier);
    if (!statusPath) {
      return NextResponse.json(
        { success: false, message: "Order has not been sent to courier yet" },
        { status: 400 },
      );
    }

    const response = await fetch(`${process.env.STEADFAST_BASE_URL}${statusPath}`, {
      headers: {
        "Api-Key": process.env.STEADFAST_API_KEY,
        "Secret-Key": process.env.STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status !== 200) {
      throw new Error(data?.message || `Courier status check failed: ${response.status}`);
    }

    const checkedAt = new Date();
    await collection.updateOne(
      { _id: orderObjectId },
      {
        $set: {
          "courier.deliveryStatus": data.delivery_status,
          "courier.lastStatusResponse": data,
          "courier.lastStatusCheckedAt": checkedAt,
          updatedAt: checkedAt,
        },
        $push: {
          "courier.logs": {
            at: checkedAt,
            event: "status_checked",
            message: `Courier status: ${data.delivery_status || "unknown"}`,
            response: data,
          },
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Courier status updated",
      deliveryStatus: data.delivery_status,
      response: data,
    });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Courier status check failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Courier status check failed" },
      { status: 500 },
    );
  }
}
