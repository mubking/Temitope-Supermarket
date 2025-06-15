'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
