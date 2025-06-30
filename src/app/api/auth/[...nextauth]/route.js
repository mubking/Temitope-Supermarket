// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

export const handler = async (req, res) => {
  try {
    console.log("🔐 Fetching auth options...");
    const authOptions = await getAuthOptions();

    console.log("✅ Auth options fetched");
    const nextAuthHandler = NextAuth(authOptions);
    return nextAuthHandler(req, res);
  } catch (error) {
    console.error("🔥 AUTH ROUTE ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = handler;
export const POST = handler;
