"use client";

import React from "react";

const DeliveryForm = ({
  form,
  setForm,
  deliveryType,
  setDeliveryType,
  savedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  shippingOption,
  setShippingOption,
  date,
  setDate,
  time,
  setTime,
}) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">02 / Delivery Option</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${deliveryType === "home" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setDeliveryType("home")}
        >
          Home Delivery
        </button>
        <button
          className={`px-4 py-2 rounded ${deliveryType === "store" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setDeliveryType("store")}
        >
          Collect in Store
        </button>
      </div>

      {deliveryType === "home" ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          {savedAddresses.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Use a Saved Address</label>
              <select
                className="w-full border p-2 rounded"
                value={selectedAddressId}
                onChange={(e) => {
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
                }}
              >
                <option value="">Select from saved addresses</option>
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.fullName} — {addr.address}, {addr.city}
                  </option>
                ))}
              </select>
            </div>
          )}

          <input
            type="text"
            placeholder="Address"
            className="border p-2 w-full rounded"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 w-full rounded"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 w-full rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 w-full rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
            value="No. 10, Opposite Gada Market, Temitope Supermarket, Taiwo Isale"
            disabled
          />
          <input
            type="hidden"
            value="No. 10, Opposite Gada Market, Temitope Supermarket, Taiwo Isale"
            name="pickupStore"
          />
        </div>
      )}

      {deliveryType === "home" && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">04 / Shipping Option</h1>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Select a shipping option</label>
            <select
              className="w-full border rounded p-2"
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
            >
              <option>Scheduled Delivery</option>
              <option>Urgent Delivery</option>
            </select>
          </div>
          <p className="text-red-600 text-sm mb-4">
            Note: Final delivery window depends on time of payment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-1 text-gray-700">Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Select Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Time</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
