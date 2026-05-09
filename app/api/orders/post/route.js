import { randomBytes, createHash } from "crypto";
import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";
import { orderSchema } from "../../../../lib/schemas";

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

const generateOrderId = async (collection) => {
  const count = await collection.countDocuments();
  return String(count + 1);
};

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors.map((error) => error.message).join(", "),
        },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.ORDERS);
    const orderId = await generateOrderId(collection);
    const orderAccessToken = randomBytes(32).toString("hex");

    const result = await collection.insertOne({
      ...validation.data,
      orderId,
      orderAccessHash: hashToken(orderAccessToken),
      createdAt: new Date(),
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order saved successfully",
        id: result.insertedId,
        orderId,
        orderAccessToken,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
