"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext";

export default function ProfilePage() {
  const { data: session } = useSession() || {};
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        email: session.user.email || "",
        name: `${session.user.firstName || ""} ${session.user.lastName || ""}`,
        phone: "",
      });
    }
  }, [session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting profile update:", formData);

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "session": `${session?.user?.email}` }, // Ensure email is sent in headers
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        await fetch("/api/auth/session?update=true"); // 🔄 Refresh session
        showToast({
          title: "✅ Profile updated! Changes will reflect after your next login.",
          status: "info", // or "success", "error"
        });
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      showToast("Server error", "error");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "session": `${session?.user?.email}` }, // Ensure email is sent in headers
        body: JSON.stringify(passwords),
      });

      const data = await res.json();

      if (res.ok) {
        showToast({
          title: "✅ Password updated successfully.",
          status: "success",
        });
        setPasswords({ currentPassword: "", newPassword: "" });
      } else {
        let message = data.message || "Something went wrong.";
        if (res.status === 401) {
          message = "❌ Current password is incorrect. Please try again.";
        } else if (res.status === 400) {
          message = "⚠️ Please fill in both password fields.";
        }
        showToast({ title: message, status: "error" });
      }
    } catch (err) {
      console.error("Password change error:", err);
      showToast({
        title: "🚨 Server error. Please try again later.",
        status: "error",
      });
    }
  };


  return (
    <div className="max-w-xl mx-auto py-10 px-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-6">Account Details</h2>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save Changes
        </button>
      </form>

      <hr className="my-8" />

      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, currentPassword: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
