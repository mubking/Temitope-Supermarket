import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
