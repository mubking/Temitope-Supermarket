'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.replace("/dashboard"); // redirect non-admins
    }

    if (status === "unauthenticated") {
      router.replace("/login"); // redirect unauthenticated users
    }
  }, [status, session, router]);

  if (status === "loading" || !session?.user?.isAdmin) {
    return (
      <div className="p-4">
        <p>Checking session or redirecting...</p>
        <pre className="text-xs text-red-600 bg-gray-100 p-2">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <pre className="text-xs text-green-700 bg-green-100 p-2 mb-2">
          ✅ Admin session: {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      {children}
    </>
  );
}
