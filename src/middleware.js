import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  console.log("MIDDLEWARE TOKEN:", token);

  if (!url.pathname.startsWith("/admin")) return NextResponse.next();

  // 🔧 TEMP: Allow all access for now
  return NextResponse.next();

  // 🔒 PROPER check (restore later)
  // if (!token || !token.isAdmin) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}

export const config = {
  matcher: ["/admin(.*)"],
};
