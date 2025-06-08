import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log("No session or email");
    return new Response("Unauthorized", { status: 401 });
  }

  const { name } = await req.json();
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");

  console.log("Updating:", { firstName, lastName });

  await connectToDB();

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { firstName, lastName } },
    { new: true }
  );

  if (!updatedUser) {
    return new Response("User not found", { status: 404 });
  }

  console.log("User updated:", updatedUser);
  return new Response(JSON.stringify({ message: "Updated", user: updatedUser }), {
    status: 200,
  });
}
