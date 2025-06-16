"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function OrderHistoryPage() {
  const { data: session, status } = useSession() || {};
  const [orders, setOrders] = useState([]);
  const email = session?.user?.email || "";

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/orders", { headers: { "Content-Type": "application/json", "email": `${email}` } });
          const data = await res.json();
          if (Array.isArray(data)) {
            setOrders(data);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [status]);

  if (!session) return <div className="p-6 text-center">Please login to view your orders.</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <DashboardNavbar/>
      <h1 className="text-2xl font-semibold mb-6 text-center">My Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 bg-white text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Date Ordered</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Payment</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Delivery Type</th>
                <th className="p-3 border">Delivery Address</th>
                <th className="p-3 border">Delivery Date</th>
                <th className="p-3 border">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">{order.customer}</td>
                  <td className="p-2 border">{order.userEmail}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <ul className="list-disc ml-4">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border">₦{order.amount.toLocaleString()}</td>
                  <td className="p-2 border">{order.paymentMethod}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">{order.deliveryType}</td>
                  <td className="p-2 border">{order.deliveryDetails}</td>
                  <td className="p-2 border">{order.deliveryDate || "N/A"}</td>
                  <td className="p-2 border">{order.deliveryTime || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
