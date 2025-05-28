import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
// import crypto from "crypto";

function generateReferralCode() {
  return Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase(); // e.g. "4F7A2C19"
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const { firstName, lastName, email, password, referralInput } = body;

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
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong during registration." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

