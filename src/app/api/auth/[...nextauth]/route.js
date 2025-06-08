import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ Correct import from shared config

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);




// import { handlers } from "@/auth/auth";
// export const { GET, POST } = handlers;