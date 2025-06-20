// app/api/orders/new/route.js
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendSMS } from "@/lib/sendSMS";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, items, amount, phone, status, referrerCode, paymentStatus } = body;

    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const order = await Order.create({
      customer: user.email,
      items,
      amount,
      phone,
      status: "Processing",
    });

    const formattedPhone = formatPhone(user.phone || phone);
    const firstName = user.firstName || "Customer";

    await sendSMS({
      to: formattedPhone,
      message: `Hi ${firstName}, your order #${order._id} has been placed successfully! 🛒`,
    });

    if (paymentStatus === "paid") {
      await sendSMS({
        to: formattedPhone,
        message: `Payment received for order #${order._id}. Thank you! 💵`,
      });
    }

    if (referrerCode) {
      const referrer = await User.findOne({ referralCode: referrerCode });
      if (referrer?.phone) {
        await sendSMS({
          to: formatPhone(referrer.phone),
          message: `🎉 You just earned ₦500 for referring a new customer!`,
        });
      }
    }

    return new Response(JSON.stringify({ success: true, order }), { status: 201 });

  } catch (err) {
    console.error("Order creation error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

function formatPhone(phone) {
  return phone?.startsWith("0") ? "234" + phone.slice(1) : phone;
}