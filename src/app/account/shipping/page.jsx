"use client";
import { useEffect, useState } from "react";
import AddAddressForm from "@/components/AddAddressForm";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "next-auth/react";

const ShippingInfoPage = () => {
    const { data: session } = useSession() || {};
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // address object
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        note: "",
    });
    const { showToast } = useToast();



    const fetchAddresses = async () => {
        const res = await fetch("/api/account/addresses", {
            headers: {
                "session": `${session?.user?.id}`, // Ensure email is sent in headers
            },
        });
        const data = await res.json();
        setAddresses(data.addresses || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Shipping Info</h2>

            {/* Preferred Method - Static for now */}
            <AddAddressForm onSuccess={fetchAddresses} />

            <div className="mb-6">
                <p className="font-semibold">Preferred Delivery Method:</p>
                <p className="text-sm text-gray-600">Home Delivery</p>
            </div>

            {/* Saved Addresses */}
            <div className="mb-6">
                <p className="font-semibold mb-2">Saved Addresses:</p>

                {loading ? (
                    <p>Loading...</p>
                ) : addresses.length === 0 ? (
                    <p>No saved addresses yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {addresses.map((addr) => (
                            <li key={addr._id} className="border p-3 rounded-md bg-white shadow-sm">
                                <p className="font-medium">{addr.fullName}</p>
                                <p className="text-sm">{addr.address}, {addr.city}</p>
                                <p className="text-sm">📞 {addr.phone}</p>
                                <p className="text-sm text-gray-500 mt-1 italic">{addr.note || "No instructions"}</p>
                                <div className="mt-2 space-x-4 text-sm">
                                    <button
                                        className="text-blue-600"
                                        onClick={() => {
                                            setEditing(addr);
                                            setFormData({
                                                fullName: addr.fullName,
                                                phone: addr.phone,
                                                address: addr.address,
                                                city: addr.city,
                                                note: addr.note || "",
                                            });
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600"
                                        onClick={async () => {
                                            if (confirm("Are you sure you want to delete this address?")) {
                                                try {
                                                    const res = await fetch("/api/account/addresses", {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "session": `${session?.user?.id}`, // Ensure email is sent in headers
                                                        },

                                                        body: JSON.stringify({ id: addr._id }),
                                                    });

                                                    const data = await res.json();
                                                    if (res.ok) {
                                                        showToast({
                                                            title: "✅ Address deleted",
                                                            status: "success",
                                                        });

                                                        fetchAddresses(); // Refresh list
                                                    } else {
                                                        showToast({
                                                            title: "❌ Failed to delete address",
                                                            status: "error",
                                                        });
                                                    }
                                                } catch (err) {
                                                    showToast({
                                                        title: "Something went wrong while deleting address",
                                                        status: "error",
                                                    });
                                                }
                                            }
                                        }}

                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Edit Form */}
            {editing && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await fetch("/api/account/addresses", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "session": `${session?.user?.id}`, // Ensure email is sent in headers
                            },
                            body: JSON.stringify({ ...formData, id: editing._id }),
                        });
                        const data = await res.json();
                        if (res.ok) {
                            setEditing(null);
                            fetchAddresses();
                        } else {
                            alert(data.error || "Update failed");
                        }
                    }}
                    className="bg-white p-4 rounded shadow mb-4 space-y-3"
                >
                    <h3 className="font-semibold text-lg">Edit Address</h3>

                    <input
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        name="note"
                        placeholder="Note (optional)"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full p-2 border rounded"
                    />

                    <div className="flex gap-4">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Save
                        </button>
                        <button
                            type="button"
                            className="text-red-600"
                            onClick={() => setEditing(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ShippingInfoPage;
