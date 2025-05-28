// app/api/referral/generate/route.js
import { connectToDB } from "@/utils/db";
import ReferralCode from "@/models/ReferralCode";

export async function POST(req) {
  await connectToDB();
  const { code, discount, expiresAt } = await req.json();

  try {
    const newCode = await ReferralCode.create({ code, discount, expiresAt });
    return new Response(JSON.stringify({ success: true, code: newCode }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Code already exists or invalid" }), { status: 400 });
  }
}
