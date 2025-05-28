// File: src/app/api/products/route.js

import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    let products = [];

    if (q) {
      const queryWords = q.trim().toLowerCase().split(/\s+/);
      const allProducts = await Product.find();

      products = allProducts.filter((product) => {
        const nameWords = product.name.toLowerCase().split(/\s+/);
        const matchCount = queryWords.filter(word => nameWords.includes(word)).length;

        // Match at least 1 if the query is short, or 2 if the query is long
        const requiredMatches = queryWords.length <= 1 ? 1 : 2;

        return matchCount >= requiredMatches;
      });

    } else {
      products = await Product.find();
    }

    return new Response(JSON.stringify({ products }), { status: 200 });
  } catch (error) {
    console.error("❌ Search GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}
