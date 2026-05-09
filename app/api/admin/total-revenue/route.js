import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

export async function GET(request) {
  try {
    await verifyFirebaseToken(request); // 🔒 Reject unauthenticated requests

    const collection = await dbConnect(collections.ORDERS);
    const result = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" } 
        }
      }
    ]).toArray();

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    return NextResponse.json({ success: true, revenue }, { status: 200 });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: error.status || 401 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
