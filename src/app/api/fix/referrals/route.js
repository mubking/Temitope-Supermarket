import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";

function generateReferralCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g. "A1B2C3"
}

export async function GET() {
  try {
    await connectToDB();

    const users = await User.find({ referralCode: { $exists: false } });

    for (const user of users) {
      user.referralCode = generateReferralCode();
      await user.save();
    }

    return NextResponse.json({ success: true, updated: users.length });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
