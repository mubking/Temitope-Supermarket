import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import User from "@/models/User";
import { connectToDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  await connectToDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) return new Response("User not found", { status: 404 });

  const isValid = await bcrypt.compare(currentPassword, user.password);
if (!isValid) {
  return new Response(
    JSON.stringify({ message: "Incorrect current password." }),
    { status: 401, headers: { "Content-Type": "application/json" } }
  );
}

  const hashedNew = await bcrypt.hash(newPassword, 10);
  user.password = hashedNew;
  await user.save();

  return new Response(JSON.stringify({ message: "Password updated" }), {
    status: 200,
  });
}
