import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  // Allow everything not under /admin
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!token || !token.isAdmin) {
    console.warn("⛔ Non-admin tried accessing:", url.pathname);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin(.*)"],
};
