"use client";
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/products", label: "Products", icon: <Package className="w-5 h-5" /> },
    { href: "/admin/orders", label: "Orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/credit-applications", label: "Credit Apps", icon: <FileText className="w-5 h-5" /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { href: "/admin/orderList", label: "Order list", icon: <Settings className="w-5 h-5" /> },
    { href: "/api/account/addresses ", label: "User  Address", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className={`bg-gray-900 text-white min-h-screen flex flex-col ${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className={`text-xl font-bold transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>Admin page</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                {icon}
                <span className={`${sidebarOpen ? "block" : "hidden"} transition-all duration-200`}>
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <LogOut className="w-5 h-5" />
          <span className={`${sidebarOpen ? "block" : "hidden"}`}>Back to Website</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
