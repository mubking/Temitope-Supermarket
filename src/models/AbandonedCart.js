import mongoose from "mongoose";

const AbandonedCartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cart: { type: Array, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AbandonedCart || mongoose.model("AbandonedCart", AbandonedCartSchema);
