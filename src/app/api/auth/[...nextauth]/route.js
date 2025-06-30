import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions"; // or getSafeAuthOptions if caching is preferred

const handler = async (req, res) => {
  const authOptions = await getAuthOptions(); // ⬅️ now safe inside async
  return NextAuth(authOptions)(req, res);
};

export const GET = handler;
export const POST = handler;
