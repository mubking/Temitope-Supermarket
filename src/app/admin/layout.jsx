// src/app/admin/layout.jsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/");
    }
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
