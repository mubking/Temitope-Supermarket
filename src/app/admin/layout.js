// src/app/admin/layout.js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getSafeAuthOptions } from "@/lib/auth"; // ✅ use the re-export wrapper

export default async function AdminLayout({ children }) {
  const authOptions = await getSafeAuthOptions(); // ✅ safely get options
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <pre className="text-xs text-green-700 bg-green-100 p-2 mb-2">
        ✅ Admin session: {JSON.stringify(session, null, 2)}
      </pre>
      {children}
    </div>
  );
}
