import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";

export async function GET(req) {
  await connectToDB();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userCart = await Cart.findOne({ userId: token.id });
    return NextResponse.json({ cart: userCart?.items || [] });
  } catch (error) {
    console.error("❌ Failed to fetch cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
