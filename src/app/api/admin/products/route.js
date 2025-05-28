import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find(); // ✅ this line is now allowed
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Product received:", body); // ✅ log incoming data

    await connectToDB();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("❌ Admin POST error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

