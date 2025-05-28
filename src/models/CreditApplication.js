import mongoose from "mongoose";

const CreditAppSchema = new mongoose.Schema({
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
    enum: ["Pending", "Under Review", "Approved", "Rejected"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.models.CreditApplication || mongoose.model("CreditApplication", CreditAppSchema);
