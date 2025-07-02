import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (req) => {
  const authOptions = await getAuthOptions();
  const nextAuthHandler = NextAuth(authOptions);
  return nextAuthHandler(req);
};

export const GET = handler;
export const POST = handler;
