import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function POST(req) {
  const email = req.headers.get("session");

  if (!email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectToDB();

    // Use text() to debug empty body if needed
    const rawBody = await req.text();
    if (!rawBody) {
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newOrder = await Order.create({
      userEmail: email,
      customer: data.customer,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: data.status || "Processing",
      items: data.items,
      deliveryType: data.deliveryType,
      deliveryDetails: data.deliveryDetails,
      shippingOption: data.shippingOption,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
    });

    return new Response(JSON.stringify(newOrder), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔥 Order creation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
  