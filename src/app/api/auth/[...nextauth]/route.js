// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// const handler = async (req, res) => {
//   return NextAuth(req, res, authOptions);
// };

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// ✅ App Router-style handlers
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
