import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

/**
 * Because getAuthOptions() is async, we
 * 1. build the NextAuth instance inside each handler
 * 2. immediately forward the request to the right sub-handler.
 */
export async function GET(request) {
  const opts      = await getAuthOptions();
  const { handlers } = NextAuth(opts);
  return handlers.GET(request);        // ✅ web-standard Request
}

export async function POST(request) {
  const opts      = await getAuthOptions();
  const { handlers } = NextAuth(opts);
  return handlers.POST(request);       // ✅ web-standard Request
}
