"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Pusher from "pusher-js";

const OrderHistoryPage = () => {
  const { data: session, status } = useSession() || {};
  const [orders, setOrders] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const email = session?.user?.email || "";

  // ✅ Fetch user's order history once
  const fetchOrders = async () => {
    const res = await fetch("/api/orders/history", {
      headers: {
        "Content-Type": "application/json",
        "email": `${email}`, // must be a string
      },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (status === "authenticated" && !hasFetched) {
      fetchOrders();
      setHasFetched(true);
    }
  }, [status, hasFetched]);

  // ✅ Setup Pusher listener
  useEffect(() => {
    if (status !== "authenticated") return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "your_cluster", // replace with your actual cluster
    });

    const channel = pusher.subscribe("orders");

    const handleStatusUpdate = ({ orderId, newStatus }) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId && order.status !== newStatus
            ? { ...order, status: newStatus }
            : order
        )
      );
    };

    channel.bind("order-updated", handleStatusUpdate);

    return () => {
      channel.unbind("order-updated", handleStatusUpdate);
      channel.unsubscribe();
    };
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <DashboardNavbar />
      <h1 className="text-2xl font-bold mb-6 text-center">My Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300 text-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Delivery Type</th>
              <th className="p-2 border">Delivery Info</th>
              <th className="p-2 border">Delivery Date</th>
              <th className="p-2 border">Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.customer}</td>
                <td className="p-2 border">{order.userEmail}</td>
                <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-2 border">
                  <ul className="list-disc ml-4">
                    {order.items?.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border">₦{order.amount.toLocaleString()}</td>
                <td className="p-2 border">{order.paymentMethod}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.deliveryType}</td>
                <td className="p-2 border text-xs whitespace-pre-line">
                  {order.deliveryDetails?.fullName && `Name: ${order.deliveryDetails.fullName}\n`}
                  {order.deliveryDetails?.phone && `Phone: ${order.deliveryDetails.phone}\n`}
                  {order.deliveryDetails?.address && `Address: ${order.deliveryDetails.address}\n`}
                  {order.deliveryDetails?.city && `City: ${order.deliveryDetails.city}\n`}
                  {order.deliveryDetails?.landmark && `Landmark: ${order.deliveryDetails.landmark}\n`}
                  {order.deliveryDetails?.pickupStore && `Store: ${order.deliveryDetails.pickupStore}`}
                </td>
                <td className="p-2 border">{order.deliveryDate || "N/A"}</td>
                <td className="p-2 border">{order.deliveryTime || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-6 p-4 bg-yellow-100 text-sm rounded-md text-yellow-800 border border-yellow-300">
        <p className="mb-2 font-semibold">Need a refund?</p>
        <p>
          If your order was delivered within the last <strong>3 days</strong> and you want to request a return or refund,
          please contact our support team:
        </p>
        <div className="mt-2 flex gap-4">
          <a
            href="mailto:support@temitopesupermarket.com?subject=Refund Request"
            className="underline text-blue-700"
          >
            📧 Email Support
          </a>
          <a
            href={`https://wa.me/2349056116119?text=${encodeURIComponent(
              `Hello Temitope Supermarket,\n\nI would like to request a refund.\n\nMy name is ${session?.user?.name || "[Enter your full name]"
              }, and my email is ${session?.user?.email || ""}.\nPlease assist me.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-green-700"
          >
            💬 WhatsApp Support
          </a>

        </div>
      </div>

    </div>
  );
};

export default OrderHistoryPage;
