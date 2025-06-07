import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customer: String,
    amount: Number,
    userEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
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

    // ✅ These should be inside the object
    refundRequest: {
      type: Boolean,
      default: false,
    },
    refundDetails: {
      type: Object,
      default: null,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
