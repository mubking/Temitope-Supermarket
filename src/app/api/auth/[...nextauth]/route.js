import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (...args) => {
  const options = await getAuthOptions();
  return NextAuth(...args, options);
};

export { handler as GET, handler as POST };
