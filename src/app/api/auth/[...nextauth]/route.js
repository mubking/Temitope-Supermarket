import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (req, ctx) => {
  const options = await getAuthOptions();
  return NextAuth(options)(req, ctx);
};

export const GET = handler;
export const POST = handler;
