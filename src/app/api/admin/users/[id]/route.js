import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  const { params } = context; // ✅ Destructure correctly with semicolon
  const userId = params.id;   // ✅ Now this works

  try {
    await connectToDB();
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user failed:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
