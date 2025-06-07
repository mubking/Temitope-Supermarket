import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  await connectToDB();
  const data = await req.formData();
  const orderId = data.get("orderId");
  const items = JSON.parse(data.get("items"));
  const reason = data.get("reason");
  const image = data.get("image");

  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Check 3-day window
  const now = new Date();
  const deliveredDate = new Date(order.deliveredAt);
  const days = (now - deliveredDate) / (1000 * 60 * 60 * 24);
  if (days > 3) return NextResponse.json({ error: "Return window expired" }, { status: 400 });

  let imageURL = "";
  if (image && typeof image.arrayBuffer === "function") {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filePath = path.join("/tmp", `${randomUUID()}.png`);
    await writeFile(filePath, buffer);

    const upload = await cloudinary.uploader.upload(filePath);
    imageURL = upload.secure_url;
  }

  order.refundRequest = true;
  order.refundDetails = {
    reason,
    items,
    imageURL,
    status: "Pending",
    date: new Date(),
  };
  await order.save();

  return NextResponse.json({ message: "Refund request submitted" });
}
