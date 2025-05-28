"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { useEffect, useState } from "react";
import { FaBox, FaPhone, FaMapMarkerAlt, FaClock, FaTruck } from "react-icons/fa";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Expected array, received:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Customer Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-5 border">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBox className="text-blue-500" /> Order from {order.customer || "Guest"}
                </h2>

                <div className="mb-2 text-sm">
                  <span className="font-medium text-gray-600">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><FaTruck className="inline mr-1 text-blue-400" /> {order.deliveryType} - {order.shippingOption}</p>
                  <p><FaMapMarkerAlt className="inline mr-1 text-red-400" /> {order.deliveryDetails?.address || "N/A"}</p>
                  <p><FaPhone className="inline mr-1 text-green-500" /> {order.deliveryDetails?.phone || "N/A"}</p>
                  <p><FaClock className="inline mr-1 text-purple-500" /> {order.deliveryDate} at {order.deliveryTime}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Items:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        {item.name} × {item.quantity} — ₦{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
