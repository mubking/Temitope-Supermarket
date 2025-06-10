import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";

export async function POST(req) {
  await connectToDB();

  try {
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response("Invalid content type", { status: 400 });
    }

    const bodyText = await req.text();
    if (!bodyText) {
      return new Response("Empty body", { status: 400 });
    }

    const { userId, cart, updatedAt } = JSON.parse(bodyText);

    if (!userId || !cart || !Array.isArray(cart) || cart.length === 0) {
      return new Response("Missing required data", { status: 400 });
    }

    await Cart.findOneAndUpdate(
      { userId },
      { items: cart, updatedAt: updatedAt || new Date() },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("track abandon error:", error);
    return new Response("Invalid JSON or server error", { status: 500 });
  }
}
