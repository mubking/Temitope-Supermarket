"use client";

import React, { useEffect, useState } from "react";

export default function CreditRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/credit-requests");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching credit requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`/api/credit-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: action }),
      });

      if (res.ok) {
        fetchRequests(); // Refresh the list
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  if (loading) return <p>Loading credit requests...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Pending Credit Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req._id}
              className="p-4 bg-white rounded-lg shadow-md border"
            >
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Amount Requested:</strong> ${req.amount}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleAction(req._id, "approved")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req._id, "rejected")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
