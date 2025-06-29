import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (...args) => {
  try {
    const options = await getAuthOptions();
    return NextAuth(...args, options);
  } catch (err) {
    console.error("❌ NextAuth production error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export { handler as GET, handler as POST };
