import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function PATCH(req, context) {
  const { params } = context;
  await connectToDB();

  const { status } = await req.json();

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  if (!order) return new Response("Order not found", { status: 404 });

  // ✅ Update user's first order flag if delivered
  if (status === "Delivered" && order.customer) {
    try {
      await User.findByIdAndUpdate(order.customer, {
        hasReceivedFirstOrder: true,
      });
    } catch (err) {
      console.error("Failed to update user flag:", err.message);
    }
  }

  // ✅ Send status update email
  const email = order.userEmail || order.deliveryDetails?.email;
  if (email) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Temitope Supermarket" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Order Status Updated",
        html: `<p>Hello, your order status has been updated to <strong>${status}</strong>.</p>`,
      });
    } catch (err) {
      console.error("Email error:", err.message);
    }
  }

  return Response.json(order);
}
