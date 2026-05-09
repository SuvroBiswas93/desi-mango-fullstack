import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

export async function GET(request) {
  try {
    await verifyFirebaseToken(request); // 🔒 Reject unauthenticated requests

    const collection = await dbConnect(collections.ORDERS);
    const count = await collection.countDocuments();
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: error.status || 401 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
