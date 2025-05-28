"use client";
import React, { useEffect, useState } from "react";

export default function CreditRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch credit requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/credit-requests");
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch credit requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle approve/reject
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/credit-requests`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        // Update local state
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, status } : r
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p>Loading credit requests...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Credit Requests</h2>
      {requests.length === 0 ? (
        <p>No credit requests found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="p-2 border">{req.userEmail}</td>
                <td className="p-2 border">₦{req.amount}</td>
                <td className="p-2 border">{req.status}</td>
                <td className="p-2 border space-x-2">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(req._id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
