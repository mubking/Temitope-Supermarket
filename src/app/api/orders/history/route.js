import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function GET(req) {
  const email = await req.headers.get("email"); 

  if (!email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();

    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}
