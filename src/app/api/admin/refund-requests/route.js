import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const orders = await Order.find({ refundRequest: true });
  return NextResponse.json({ orders });
}

export async function PATCH(req) {
  await connectToDB();
  const { orderId, status } = await req.json();

  const order = await Order.findById(orderId);
  if (!order || !order.refundRequest) {
    return NextResponse.json({ error: "Refund request not found" }, { status: 404 });
  }

  order.refundDetails.status = status;
  await order.save();

  return NextResponse.json({ message: "Refund status updated" });
}
