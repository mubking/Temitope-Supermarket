"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminOrdersPage() {
  const { data, error, isLoading } = useSWR("/api/admin/orders", fetcher);

  return (
    <div className="p-2 flex w-full min-h-screen gap-2">
      <AdminSidebar />

      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-600">Error loading orders</p>
        ) : data.orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Customer</th>
                  <th className="px-4 py-2 border-b">Amount (₦)</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2 border-b">{order.customer}</td>
                    <td className="px-4 py-2 border-b">₦{order.amount.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b">{order.status}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
