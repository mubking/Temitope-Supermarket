// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  // match /admin and everything beneath it
  matcher: ["/admin/:path*"],
};

export async function middleware(req) {
  const { nextUrl: url, headers } = req;
  // grab the token (if any) — be sure NEXTAUTH_SECRET is set in prod
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token at all → not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in but not an admin → kick back to login (or show 403 page)
  if (token.isAdmin !== true) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise, let them through to /admin/*
  return NextResponse.next();
}
