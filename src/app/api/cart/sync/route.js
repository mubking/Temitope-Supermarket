import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";

export async function POST(req) {
  await connectToDB();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItems } = await req.json();

  try {
    await Cart.findOneAndUpdate(
      { userId: token.id },
      { $set: { items: cartItems } },
      { upsert: true } // creates if not exists
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to sync cart:", error);
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}
