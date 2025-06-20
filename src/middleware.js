import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  // ✅ Only protect admin routes
  if (!url.pathname.startsWith("/admin")) return NextResponse.next();

  // ✅ Block if not admin
  if (!token || !token.isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin(.*)"],
};
