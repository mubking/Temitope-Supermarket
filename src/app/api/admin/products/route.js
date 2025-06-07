import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Product received:", body);

    await connectToDB();

    const { category, ...rest } = body;

    const categorySlug = category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");

    const product = await Product.create({
      ...rest,
      category,
      categorySlug,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("❌ Admin POST error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
