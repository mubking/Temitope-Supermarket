"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("🧭 Redirecting based on session:", session?.user);
      if (session?.user?.isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Redirecting...
    </div>
  );
}
