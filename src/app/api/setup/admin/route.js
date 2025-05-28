import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function GET() {
  await connectToDB();
  const result = await User.findOneAndUpdate(
    { email: "AdeshinaMubarak6@gmail.com" },
    { isAdmin: true },
    { new: true }
  );

  return new Response(
    JSON.stringify({ success: true, updated: result }),
    { status: 200 }
  );
}
