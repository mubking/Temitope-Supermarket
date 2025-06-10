export const runtime = "nodejs"; // prevent Edge runtime crash

import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

export async function GET(req, res) {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, res);
}

export async function POST(req, res) {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, res);
}
