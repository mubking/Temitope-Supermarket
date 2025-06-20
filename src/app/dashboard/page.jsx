'use client';

import { Suspense } from "react";
import DashboardPage from "@/components/DashboardPage"; // ⬅️ extract the logic

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
