import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../../lib/firebase/verifyToken";

export async function PATCH(req, { params }) {
  try {
    await verifyFirebaseToken(req);

    const { id } = await params;
    const { isPublish } = await req.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 },
      );
    }

    if (typeof isPublish !== "boolean") {
      return NextResponse.json(
        { success: false, error: "isPublish must be a boolean" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.PRODUCTS);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isPublish, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: isPublish ? "Product published" : "Product unpublished",
      },
      { status: 200 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Publish Status Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Publish status update failed" },
      { status: 500 },
    );
  }
}
