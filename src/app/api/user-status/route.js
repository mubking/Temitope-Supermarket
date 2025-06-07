// src/app/api/user-status/route.js
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  await connectToDB();

  const user = await User.findOne({ email });

  return Response.json({
    hasReceivedFirstOrder: user?.hasReceivedFirstOrder || false,
  });
}
