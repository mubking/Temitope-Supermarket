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

    const { cartItems } = JSON.parse(bodyText);

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response("Missing cart items", { status: 400 });
    }

    // You might want to get user ID from session in real use
    const session = await getServerSession(); // optional if you're using NextAuth
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("User not authenticated", { status: 401 });
    }

    await Cart.findOneAndUpdate(
      { userId },
      { items: cartItems, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("sync cart error:", error);
    return new Response("Invalid JSON or server error", { status: 500 });
  }
}
