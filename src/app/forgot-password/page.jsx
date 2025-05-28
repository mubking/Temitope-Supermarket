'use client';
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      showToast({
        title: "📧 Reset link sent. Check your email.",
        status: "success",
      });
    } else {
      const data = await res.json();
      showToast({ title: data.message || "Something went wrong.", status: "error" });
    }

    setIsSending(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
