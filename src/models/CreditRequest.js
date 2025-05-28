import mongoose from "mongoose";

const CreditRequestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  employmentStatus: String,
  monthlyIncome: String,
  idType: String,
  idNumber: String,
  creditStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
}, { timestamps: true });

export default mongoose.models.CreditRequest || mongoose.model("CreditRequest", CreditRequestSchema);
