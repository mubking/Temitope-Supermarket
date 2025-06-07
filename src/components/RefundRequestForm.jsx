"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RefundRequestForm({ order }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [reason, setReason] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEligible = () => {
    const deliveredDate = new Date(order.deliveredAt);
    const now = new Date();
    const diff = (now - deliveredDate) / (1000 * 60 * 60 * 24); // in days
    return diff <= 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEligible()) return toast.error("Return window expired (3 days)");

    const formData = new FormData();
    formData.append("orderId", order._id);
    formData.append("items", JSON.stringify(selectedItems));
    formData.append("reason", reason);
    if (image) formData.append("image", image);

    setIsSubmitting(true);
    const res = await fetch("/api/refund-request", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    toast[data.error ? "error" : "success"](data.message);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-bold text-lg">Refund / Return Request</h2>
      <select
        multiple
        onChange={(e) =>
          setSelectedItems([...e.target.selectedOptions].map((o) => o.value))
        }
        className="w-full border p-2"
      >
        {order.items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <textarea
        required
        placeholder="Reason for refund"
        className="w-full border p-2"
        onChange={(e) => setReason(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
