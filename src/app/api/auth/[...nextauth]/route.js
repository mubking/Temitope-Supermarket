import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

// This MUST be a function returning handlers, NOT a function that runs them
const handler = async (...args) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(...args);
};

export const GET = handler;
export const POST = handler;
