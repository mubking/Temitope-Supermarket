"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AdminSidebar from "@/components/AdminSidebar";
import axios from "axios";

export default function AdminUsersPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/admin/users", fetcher);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/admin/users/${id}`);
      mutate(); // refresh the list
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Error deleting user");
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error || !Array.isArray(data?.users)) return <p>Error loading users</p>;

  return (
    <div className="p-2 flex w-full min-h-screen gap-2">
      <AdminSidebar />

      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

        {data.users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded">
              <thead className="bg-gray-100 text-left text-sm font-semibold">
                <tr>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Role</th>
                  <th className="px-4 py-2 border-b">Created</th>
                  <th className="px-4 py-2 border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user._id} className="text-sm">
                    <td className="px-4 py-2 border-b">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.role || "user"}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b text-right">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
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
