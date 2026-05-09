import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

export async function PUT(req, { params }) {
  try {
    await verifyFirebaseToken(req);

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 },
      );
    }

    const { name, price, weight, image, description, isPublish } = await req.json();
    const parsedPrice = Number(price);

    if (!name || !weight || !image || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid product data" },
        { status: 400 },
      );
    }

    if (isPublish !== undefined && typeof isPublish !== "boolean") {
      return NextResponse.json(
        { success: false, error: "isPublish must be boolean" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.PRODUCTS);
    const updateData = {
      name,
      price: parsedPrice,
      weight,
      image,
      description: description || "",
      updatedAt: new Date(),
    };

    if (isPublish !== undefined) {
      updateData.isPublish = isPublish;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Product updated" },
      { status: 200 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Product update failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await verifyFirebaseToken(req);

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.PRODUCTS);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted" },
      { status: 200 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Product delete failed" },
      { status: 500 },
    );
  }
}
