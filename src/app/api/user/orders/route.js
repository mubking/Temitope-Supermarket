import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectToDB();

  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

  return new Response(JSON.stringify(orders), {
    headers: { "Content-Type": "application/json" },
  });
}
