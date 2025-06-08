// src/app/api/orders/route.js
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function POST(req) {
  const email = await req.headers.get("email"); 

  if (!email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();
    const data = await req.json();

    const newOrder = await Order.create({
        userEmail: email, // or session.user.id if you prefer
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
    });
  } catch (error) {
    console.error("🔥 Order creation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
