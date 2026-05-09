import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const allProducts = url.searchParams.get("status") === "all";

    if (allProducts) {
      await verifyFirebaseToken(req);
    }

    const collection = await dbConnect(collections.PRODUCTS);
    const query = allProducts ? {} : { isPublish: true };
    const products = await collection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(
      {
        success: true,
        data: products,
        count: products.length,
      },
      { status: 200 },
    );
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", data: [] },
        { status: error.status || 401 },
      );
    }

    console.error("Product load error:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: "Product load failed",
        data: [],
      },
      { status: 500 },
    );
  }
}
