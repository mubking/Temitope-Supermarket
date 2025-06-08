"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const AddAddressForm = ({ onSuccess }) => {
  const { data: session } = useSession() || {};
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/account/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "session": `${session?.user?.id}`, // Ensure email is sent in headers
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Address saved");
      onSuccess(); // Refresh list
      setForm({ fullName: "", phone: "", address: "", city: "", note: "" });
    } else {
      toast.error(data.error || "Failed to save address");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Add New Address</h3>

      <input
        name="fullName"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Full Address"
        className="w-full p-2 border rounded"
        value={form.address}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        className="w-full p-2 border rounded"
        value={form.city}
        onChange={handleChange}
        required
      />
      <textarea
        name="note"
        placeholder="Additional Notes (optional)"
        className="w-full p-2 border rounded"
        value={form.note}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
};

export default AddAddressForm;
