import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const userId = params.id;
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ User DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
