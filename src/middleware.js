import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  // ✅ Optional: Debug logging for production diagnosis
  console.log("🛡️ Middleware: Path =", url.pathname);
  console.log("🛡️ Middleware: Token =", token);
  console.log("🛡️ Cookie header:", req.headers.get("cookie"));


  if (!url.pathname.startsWith("/admin")) return NextResponse.next();

  if (!token || !token.isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin(.*)"],
};
