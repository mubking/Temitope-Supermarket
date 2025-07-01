import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

const handler = async (req, res) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, res);
};

export { handler as GET, handler as POST };
