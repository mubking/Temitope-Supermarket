import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // ✅ Add this
  referralCode: { type: String, unique: true },
  usedReferralCode: { type: String, default: null },
  hasReceivedFirstOrder: { type: Boolean, default: false },



}, {
  timestamps: true
});

// Prevent model overwrite on hot reload
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
