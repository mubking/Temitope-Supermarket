import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // Allow public routes
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Block if not authenticated or not admin
  if (!token || token.isAdmin !== true) {
    return NextResponse.redirect(new URL("/", req.url)); // redirect to homepage
  }

  return NextResponse.next(); // allow access
}

// Enable middleware only on /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
