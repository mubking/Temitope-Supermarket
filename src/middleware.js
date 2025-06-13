import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl;

  // ✅ Allow public routes
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ✅ Admin route check
  if (!token || token.isAdmin !== true) {
    console.warn("❌ Blocked: Not admin");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
