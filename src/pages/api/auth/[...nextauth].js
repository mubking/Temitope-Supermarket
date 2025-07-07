import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";


export default async function handler(req, res) {
  console.log("🔒 API Auth Route Hit:", req.method, req.url);
  const options = await getAuthOptions();
  return await NextAuth(req, res, options);
}
