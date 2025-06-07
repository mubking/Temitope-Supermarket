import { connectToDB } from "@/utils/db";
import AbandonedCart from "@/models/AbandonedCart"; // new model

export async function POST(req) {
  await connectToDB();
  const { userId, cart, updatedAt } = await req.json();

  if (!userId || !cart?.length) return new Response("Missing data", { status: 400 });

  await AbandonedCart.findOneAndUpdate(
    { userId },
    { cart, updatedAt },
    { upsert: true, new: true }
  );

  return new Response(JSON.stringify({ success: true }));
}
