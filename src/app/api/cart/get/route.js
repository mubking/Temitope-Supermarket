import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart"; // make sure you have a Cart model

export async function GET(req) {
  await connectToDB();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const userCart = await Cart.findOne({ userId: session.user.id });

  return NextResponse.json(userCart || { items: [] });
}
