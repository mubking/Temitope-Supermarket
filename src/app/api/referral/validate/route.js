// /api/referral/validate/route.js
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  await connectToDB();
  const { code, userId } = await req.json();

  const user = await User.findById(userId);
  if (!user) return new Response(JSON.stringify({ valid: false, reason: "User not found" }), { status: 404 });

  if (user.usedReferralCode) {
    return new Response(JSON.stringify({ valid: false, reason: "Referral code already used" }), { status: 400 });
  }

  const referrer = await User.findOne({ referralCode: code });
  if (!referrer) {
    return new Response(JSON.stringify({ valid: false, reason: "Invalid referral code" }), { status: 404 });
  }

  return new Response(JSON.stringify({
    valid: true,
    discount: 10, // for example, 10% off
    referrerId: referrer._id,
  }));
}
