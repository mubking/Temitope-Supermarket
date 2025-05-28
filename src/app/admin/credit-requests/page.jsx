"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext"; // at the top


export default function AdminCreditRequests() {
  const [requests, setRequests] = useState([]);
const { showToast } = useToast(); // inside your component

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("/api/admin/credit-requests");
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);
 

const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`/api/credit-requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      showToast(`Status updated to "${status}" successfully!`, "success");
      // Refresh the request list
      setRequests((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } else {
      showToast("Failed to update status", "error");
    }
  } catch (err) {
    console.error("Failed to update status", err);
    showToast("Something went wrong!", "error");
  }
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Credit Applications</h1>

      {requests.length === 0 ? (
        <p>No credit applications yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((app) => (
          <div key={app._id} className="border rounded p-4 shadow">
  <p><strong>Name:</strong> {app.firstName} {app.lastName}</p>
  <p><strong>Email:</strong> {app.email}</p>
  <p><strong>Phone:</strong> {app.phone}</p>
  <p><strong>Address:</strong> {app.address}</p>
  <p><strong>City:</strong> {app.city}</p>
  <p><strong>State:</strong> {app.state}</p>
  <p><strong>ZIP Code:</strong> {app.zipCode}</p>
  <p><strong>Employment Status:</strong> {app.employmentStatus}</p>
  <p><strong>Monthly Income:</strong> ₦{app.monthlyIncome}</p>
  <p><strong>ID Type:</strong> {app.idType}</p>
  <p><strong>ID Number:</strong> {app.idNumber}</p>
  <p><strong>Status:</strong> {app.status || "Pending"}</p>

  <div className="flex gap-2 mt-2">
    <button
      onClick={() => updateStatus(app._id, "Approved")}
      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Approve
    </button>
    <button
      onClick={() => updateStatus(app._id, "Rejected")}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Reject
    </button>
  </div>
</div>


          ))}

        </div>
      )}
    </div>
  );
}
