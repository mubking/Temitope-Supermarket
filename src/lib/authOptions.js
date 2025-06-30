// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const authOptions = await getAuthOptions(); // no need to wrap in a handler
const handler = NextAuth(authOptions); // this is already the handler

export { handler as GET, handler as POST };
