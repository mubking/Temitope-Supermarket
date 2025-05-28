import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ products: [] });
    }

    const regex = new RegExp(query, "i"); // case-insensitive
    const products = await Product.find({
      name: { $regex: regex },
    });

    return NextResponse.json({ products });
  } catch (err) {
    console.error("❌ Search error:", err);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
