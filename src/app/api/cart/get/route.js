import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart"; // make sure you have a Cart model

export async function GET(req) {
  const userId = await req.headers.get("userId"); 
  await connectToDB();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const userCart = await Cart.findOne({ userId: userId });
  return NextResponse.json(userCart || { items: [] });
}




// export async function GET() {
//   return NextResponse.json({ message: "Orders API is working" });
// }