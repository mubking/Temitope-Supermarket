import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions"; // ✅ Match exact file name (case-sensitive)

const handler = async (request, context) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(request, context);
};

export const GET = handler;
export const POST = handler;
