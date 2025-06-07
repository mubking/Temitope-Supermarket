import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function getProductsByCategory(slug) {
  await connectToDB();

  const exactSlug = slug.toLowerCase();
  const flexibleTerm = slug.split("-")[0]; // e.g. "grains" from "grains-and-oils"

  const products = await Product.find({
    $or: [
      { categorySlug: exactSlug },
      { category: { $regex: new RegExp(exactSlug.replace(/-/g, ".*"), "i") } },
      { category: { $regex: new RegExp(flexibleTerm, "i") } } // last fallback
    ]
  });

  return JSON.parse(JSON.stringify(products));
}
