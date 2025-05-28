// components/ReferralInput.jsx
"use client";
import { useState } from "react";

export default function ReferralInput({ onApply }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    const res = await fetch("/api/referral/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (data.valid) {
      setMessage(`Code applied! ${data.discount}% discount`);
      onApply(data.discount);
    } else {
      setMessage(data.reason || "Invalid code");
    }
  };

  return (
    <div className="my-2">
      <input
        type="text"
        placeholder="Enter referral code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={handleApply} className="ml-2 p-2 bg-green-500 text-white rounded">Apply</button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
