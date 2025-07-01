import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authoptions";

const handler = async (req, ctx) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, ctx);
};

export const GET = handler;
export const POST = handler;
