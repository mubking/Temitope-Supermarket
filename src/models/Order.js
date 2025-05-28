import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: String,
    amount: Number,
    userEmail: { type: String, required: true },

    status: {
      type: String,
  enum: ["Pending", "Processing", "Paid", "Failed"], // ✅ includes "Pending"
      default: "Processing",
    },
    paymentMethod: String,
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    deliveryType: String,
    deliveryDetails: Object,
    shippingOption: String,
    deliveryDate: String,
    deliveryTime: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
