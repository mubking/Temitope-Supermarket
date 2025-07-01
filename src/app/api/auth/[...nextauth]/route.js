// /app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";

export const GET = async (req) => {
  try {
    const { getAuthOptions } = await import("../../../../lib/authOptions");
    const authOptions = await getAuthOptions();
    const handler = NextAuth(authOptions);
    return handler(req);
  } catch (error) {
    console.error("🔥 GET /api/auth error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};


