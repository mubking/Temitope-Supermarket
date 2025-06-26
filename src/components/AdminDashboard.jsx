"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  useEffect(() => {
    console.log("✅ [AdminDashboard] status:", status);
    console.log("✅ [AdminDashboard] session:", session);

    if (status === "loading") return;
    if (!session || !session.user?.isAdmin) {
      router.push("/"); // Redirect non-admins
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading admin dashboard...</div>;
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar/>
      
      {/* Main Content */}
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center">
              <img src="/placeholder.svg" alt="Admin" className="w-8 h-8 rounded-full mr-2" />
              <span>Admin</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 text-sm">Total Sales</h3>
                  <p className="text-2xl font-bold">$24,780</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-green-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  8.4%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 text-sm">New Customers</h3>
                  <p className="text-2xl font-bold">385</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-green-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12.2%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 text-sm">Orders</h3>
                  <p className="text-2xl font-bold">642</p>
                </div>
                <div className="bg-orange-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-red-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  3.8%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 text-sm">Credit Applications</h3>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-green-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  16.5%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#ORD-001</td>
                    <td className="py-4 px-4 whitespace-nowrap">John Doe</td>
                    <td className="py-4 px-4 whitespace-nowrap">May 2, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">$128.50</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#ORD-002</td>
                    <td className="py-4 px-4 whitespace-nowrap">Jane Smith</td>
                    <td className="py-4 px-4 whitespace-nowrap">May 1, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">$75.20</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#ORD-003</td>
                    <td className="py-4 px-4 whitespace-nowrap">Robert Johnson</td>
                    <td className="py-4 px-4 whitespace-nowrap">April 30, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">$214.75</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Shipped</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#ORD-004</td>
                    <td className="py-4 px-4 whitespace-nowrap">Sarah Brown</td>
                    <td className="py-4 px-4 whitespace-nowrap">April 29, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">$65.99</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200 text-right">
              <a href="#" className="text-blue-600 hover:underline">View All Orders →</a>
            </div>
          </div>
          
          {/* Credit Applications */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Credit Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#APP-001</td>
                    <td className="py-4 px-4 whitespace-nowrap">Mary Johnson</td>
                    <td className="py-4 px-4 whitespace-nowrap">May 2, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending Review</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline mr-2">Review</a>
                      <a href="#" className="text-green-600 hover:underline mr-2">Approve</a>
                      <a href="#" className="text-red-600 hover:underline">Decline</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#APP-002</td>
                    <td className="py-4 px-4 whitespace-nowrap">Thomas Wilson</td>
                    <td className="py-4 px-4 whitespace-nowrap">May 1, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approved</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 whitespace-nowrap">#APP-003</td>
                    <td className="py-4 px-4 whitespace-nowrap">David Garcia</td>
                    <td className="py-4 px-4 whitespace-nowrap">April 30, 2025</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Declined</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-blue-600 hover:underline">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200 text-right">
              <a href="#" className="text-blue-600 hover:underline">View All Applications →</a>
            </div>
          </div>


        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
