import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: String,
    phone: String,
    address: String,
    city: String,
    note: String,
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);
export default Address;
