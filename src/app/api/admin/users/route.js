import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find({}, { password: 0 }); // exclude password
    return NextResponse.json({ users });
  } catch (error) {
    console.error("❌ Admin GET Users Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
