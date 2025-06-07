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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: updatedOrder.status } : o))
      );
    } catch (err) {
      console.error("❌ Status update failed:", err);
      alert("Failed to update order status.");
    }
  };

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
                  <FaBox className="text-blue-500" /> Order from{" "}
                  {order.customer || (order.userId?.firstName && order.userId?.lastName
                    ? `${order.userId.firstName} ${order.userId.lastName}`
                    : "Guest")}
                </h2>

                <p className="text-sm text-gray-500 italic">
                  {order.userId?.email || order.userEmail}
                </p>



                <div className="mb-2 text-sm">
                  <span className="font-medium text-gray-600 mr-2">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
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
