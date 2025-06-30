import React from "react";

const SummarySection = ({ calculatedSubtotal, formatCurrency }) => {
  return (
    <div className="bg-white shadow-sm border-0 overflow-hidden p-6 space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formatCurrency(calculatedSubtotal)}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600">Shipping</span>
        <div className="text-right">
          <p className="font-medium text-yellow-700">To be confirmed</p>
          <a
            href={`https://wa.me/2349037352863?text=${encodeURIComponent(
              `Hello! I'm placing an order worth ₦${calculatedSubtotal.toLocaleString()} on Temitope Supermarket. Can you please confirm the delivery fee for my location?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 text-sm underline mt-1 inline-block"
          >
            💬 Chat on WhatsApp to confirm
          </a>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium">₦0.00</span>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex justify-between">
        <span className="text-lg font-medium">Total</span>
        <span className="text-lg font-bold">{formatCurrency(calculatedSubtotal)}</span>
      </div>
    </div>
  );
};

export default SummarySection;