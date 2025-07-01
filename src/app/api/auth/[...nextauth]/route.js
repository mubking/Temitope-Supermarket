import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authoptions";

const handler = async (...args) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(...args);
};

export const GET = handler;
export const POST = handler;
