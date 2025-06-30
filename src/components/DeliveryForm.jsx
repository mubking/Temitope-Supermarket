import React from "react";

const DeliveryForm = ({ deliveryType, form, setForm, savedAddresses, selectedAddressId, setSelectedAddressId }) => {
  if (deliveryType === "store") {
    return (
      <div className="space-y-4">
        <input type="text" placeholder="Full Name" className="border p-2 w-full rounded" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input type="text" placeholder="Phone Number" className="border p-2 w-full rounded" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="text" className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed" value={form.pickupStore} disabled />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input type="text" placeholder="Full Name" className="border p-2 w-full rounded" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />

      {savedAddresses.length > 0 && (
        <select className="w-full border p-2 rounded" value={selectedAddressId} onChange={(e) => {
          const id = e.target.value;
          setSelectedAddressId(id);
          const selected = savedAddresses.find((addr) => addr._id === id);
          if (selected) {
            setForm({
              ...form,
              fullName: selected.fullName,
              phone: selected.phone,
              address: selected.address,
              city: selected.city,
              landmark: selected.note || "",
            });
          }
        }}>
          <option value="">Select from saved addresses</option>
          {savedAddresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.fullName} — {addr.address}, {addr.city}
            </option>
          ))}
        </select>
      )}

      <input type="text" placeholder="Address" className="border p-2 w-full rounded" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input type="text" placeholder="City" className="border p-2 w-full rounded" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <input type="text" placeholder="Phone Number" className="border p-2 w-full rounded" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
    </div>
  );
};

export default DeliveryForm;

