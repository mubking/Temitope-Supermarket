import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();

    const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

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
