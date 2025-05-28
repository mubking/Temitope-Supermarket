// models/referral.js (MongoDB + Mongoose example)
import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discount: { type: Number, required: true }, // e.g. 10 for 10%
  expiresAt: { type: Date },
  usageLimit: { type: Number, default: 1 },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
