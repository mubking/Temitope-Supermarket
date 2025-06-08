import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function GET() {
  const session = await req.headers.get("session"); 
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectToDB();

  const orders = await Order.find({ userEmail: session }).sort({ createdAt: -1 });

  return new Response(JSON.stringify(orders), {
    headers: { "Content-Type": "application/json" },
  });
}
