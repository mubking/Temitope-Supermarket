import AdminDashboard from '@/components/AdminDashboard';
import React from 'react';

export const dynamic = "force-dynamic";
console.log("📡 [AdminDashboard] session", session);
console.log("📡 [AdminDashboard] status", status);


function AdminPage() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}

export default AdminPage;
