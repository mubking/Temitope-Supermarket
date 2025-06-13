import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("🛡️ Token in middleware:", token); // 👈 Add this

  const url = req.nextUrl;

  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!token || token.isAdmin !== true) {
    console.warn("❌ Middleware Block: Not admin or no token");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
