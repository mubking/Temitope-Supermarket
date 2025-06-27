'use client';

import { ToastProvider } from "@/contexts/ToastContext"; // ✅ import provider

export default function AdminLayout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
