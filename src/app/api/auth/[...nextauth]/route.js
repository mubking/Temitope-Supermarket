// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (...args) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(...args); // ✅ correct usage in App Router
};

export const GET = handler;
export const POST = handler;
