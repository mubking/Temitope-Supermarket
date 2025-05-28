import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, newPassword } = await req.json();
  await connectToDB();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid or expired token." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  return new Response(JSON.stringify({ message: "Password updated" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
