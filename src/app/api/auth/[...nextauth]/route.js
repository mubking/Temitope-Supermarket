import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const authOptions = await getAuthOptions();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
