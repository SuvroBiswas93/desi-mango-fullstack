import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

export async function POST(request) {
  try {
    await verifyFirebaseToken(request);

    const body = await request.json();
    const { name, price, weight, image, description, isPublish } = body;
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
    const newProduct = {
      name,
      price: parsedPrice,
      weight,
      image,
      description: description || "",
      isPublish: isPublish !== undefined ? isPublish : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newProduct);

    return NextResponse.json(
      {
        success: true,
        message: "Product created",
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Create Product Error:", error);
    return NextResponse.json(
      { success: false, error: "Product create failed" },
      { status: 500 },
    );
  }
}
