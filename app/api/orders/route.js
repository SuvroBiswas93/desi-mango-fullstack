import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../lib/firebase/verifyToken";

const allowedStatuses = new Set(["pending", "confirmed", "delivered", "all"]);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(request) {
  try {
    await verifyFirebaseToken(request);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending";
    const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit"), 10) || 10, 1),
      50,
    );
    const search = (searchParams.get("search") || "").trim().slice(0, 80);
    const skip = (page - 1) * limit;

    if (!allowedStatuses.has(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.ORDERS);
    const query = status === "all" ? {} : { status };

    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { "customer.name": { $regex: safeSearch, $options: "i" } },
        { "customer.phone": { $regex: safeSearch, $options: "i" } },
        { "customer.address": { $regex: safeSearch, $options: "i" } },
      ];
    }

    const orders = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalOrders = await collection.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
