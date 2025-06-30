import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    console.log("Incoming request to /api/cart/sync");
    console.log("Parsed body:", body);

    const { userId } = body;

    if (!userId) {
      console.error("❌ Missing userId in body", body);
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Optional: log item count if needed
    console.log(`Clearing cart for userId: ${userId}`);

    await Cart.deleteOne({ userId });

    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
  