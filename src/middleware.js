export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  console.log("🧠 Middleware token:", token);
  console.log("🔐 Middleware pathname:", url.pathname);

  if (!url.pathname.startsWith("/admin")) return NextResponse.next();

  if (!token || !token.isAdmin) {
    console.log("⛔️ Redirecting to /dashboard because not admin");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
