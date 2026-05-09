import { NextResponse } from "next/server";
import { isAuthError, verifyFirebaseToken } from "../../../../lib/firebase/verifyToken";

const requiredEnv = ["STEADFAST_BASE_URL", "STEADFAST_API_KEY", "STEADFAST_SECRET_KEY"];

const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);

export async function GET(req) {
  try {
    await verifyFirebaseToken(req);

    const missingEnv = getMissingEnv();
    if (missingEnv.length) {
      return NextResponse.json(
        { success: false, message: `Missing courier config: ${missingEnv.join(", ")}` },
        { status: 500 },
      );
    }

    const response = await fetch(`${process.env.STEADFAST_BASE_URL}/get_balance`, {
      headers: {
        "Api-Key": process.env.STEADFAST_API_KEY,
        "Secret-Key": process.env.STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || `Courier balance check failed: ${response.status}`,
          response: data,
        },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Courier credentials are valid",
      currentBalance: data.current_balance,
      response: data,
    });
  } catch (error) {
    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: error.status || 401 },
      );
    }

    console.error("Courier balance check failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Courier balance check failed" },
      { status: 500 },
    );
  }
}
