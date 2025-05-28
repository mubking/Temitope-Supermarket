import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  await connectToDB();
  const { code } = await req.json();

  const referrer = await User.findOne({ referralCode: code });

  if (!referrer) {
    return new Response(JSON.stringify({ valid: false, reason: "Invalid code" }), { status: 404 });
  }

  return new Response(JSON.stringify({
    valid: true,
    referrerId: referrer._id,
    referrerEmail: referrer.email
  }), { status: 200 });
}
