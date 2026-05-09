import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

const hasAdminBearer = (request) =>
  request.headers.get("authorization")?.startsWith("Bearer ");

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const accessToken = searchParams.get("token");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Order ID" },
        { status: 400 },
      );
    }

    const ordersCollection = await dbConnect(collections.ORDERS);
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    if (hasAdminBearer(request)) {
      await verifyFirebaseToken(request);
    } else if (!accessToken || hashToken(accessToken) !== order.orderAccessHash) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Get single order error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
