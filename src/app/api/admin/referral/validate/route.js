// app/api/referral/validate/route.js
import { connectToDB } from "@/utils/db";
import ReferralCode from "@/models/ReferralCode";

export async function POST(req) {
  await connectToDB();
  const { code } = await req.json();

  const found = await ReferralCode.findOne({ code });

  if (!found) return new Response(JSON.stringify({ valid: false, reason: "Invalid code" }), { status: 404 });

  if (found.expiresAt && new Date() > found.expiresAt)
    return new Response(JSON.stringify({ valid: false, reason: "Code expired" }), { status: 400 });

  if (found.isUsed)
    return new Response(JSON.stringify({ valid: false, reason: "Code already used" }), { status: 400 });

  return new Response(JSON.stringify({ valid: true, discount: found.discount }), { status: 200 });
}
