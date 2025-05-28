import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDB } from '../../../utils/db.js';
import { products } from "../../../data/products/products.js";
import Product from '../../../models/Product.js';

dotenv.config({ path: ".env.local" });

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "temitope-supermarket",
    });

    console.log("🌱 Connected to MongoDB");
    await Product.deleteMany(); // Optional: clear old
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed products:", error);
    process.exit(1);
  }
}

seedProducts();
