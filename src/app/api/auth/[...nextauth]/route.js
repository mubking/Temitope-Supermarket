import NextAuth from "next-auth";
import { getAuthOptions } from "../../../../lib/authOptions";

let handler;

try {
  console.log("📦 Calling getAuthOptions...");
  const authOptions = await getAuthOptions();
  console.log("✅ Auth options fetched");

  handler = NextAuth(authOptions);
  console.log("✅ NextAuth handler created");
} catch (error) {
  console.error("🔥 Failed to setup NextAuth handler:", error);
  handler = () => new Response("Internal Server Error", { status: 500 });
}

export { handler as GET, handler as POST };
