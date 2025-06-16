import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

function generateReferralCode() {
  return randomBytes(4).toString("hex").toUpperCase();
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const { firstName, lastName, email, password, referralInput } = body;

    // ✅ Basic validation
    if (!email || !password || !firstName || !lastName) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User with this email already exists." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let usedReferralCode = null;

    if (referralInput) {
      const ref = await User.findOne({ referralCode: referralInput });
      if (ref) usedReferralCode = referralInput;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      referralCode: generateReferralCode(),
      usedReferralCode,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "Registration successful." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Registration error:", error?.message || error);

    // MongoDB specific permission error
    if (error?.message?.toLowerCase().includes("not authorized") || error?.code === 13) {
      return new Response(
        JSON.stringify({ message: "Permission denied - check database user roles." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Something went wrong during registration." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
