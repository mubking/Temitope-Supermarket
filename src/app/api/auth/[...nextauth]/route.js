import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

export async function GET(request) {
  try {
    const options = await getAuthOptions();
    const { handlers } = NextAuth(options);
    return handlers.GET(request);
  } catch (error) {
    console.error("❌ GET /api/auth error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const options = await getAuthOptions();
    const { handlers } = NextAuth(options);
    return handlers.POST(request);
  } catch (error) {
    console.error("❌ POST /api/auth error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
