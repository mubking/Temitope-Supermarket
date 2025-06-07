import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function DELETE(_req, { params }) {
  try {
    await connectToDB();
    console.log("Deleting product with ID:", params.id);
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    await connectToDB();
    console.log("Updating product with ID:", params.id);

    const { category, ...rest } = body;

    let updateData = { ...rest };

    if (category) {
      const categorySlug = category
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, "-");

      updateData.category = category;
      updateData.categorySlug = categorySlug;
    }

    const updated = await Product.findByIdAndUpdate(params.id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ PATCH error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
