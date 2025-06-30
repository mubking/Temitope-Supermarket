import NextAuth from "next-auth";
import { getSafeAuthOptions } from "@/lib/auth";

const handler = async (req, res) => {
  try {
    console.log("📥 Incoming request to /api/auth");

    const authOptions = await getSafeAuthOptions();
    console.log("✅ Auth options loaded");

    const nextAuthHandler = NextAuth(authOptions);
    return nextAuthHandler(req, res);
  } catch (err) {
    console.error("🔥 AUTH ROUTE ERROR:", {
      message: err?.message,
      stack: err?.stack,
      cause: err?.cause,
    });

    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

export const GET = handler;
export const POST = handler;
