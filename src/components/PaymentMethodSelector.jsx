import React from "react";

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
  const methods = ["Paystack", "Cash on Delivery", "Credit"];
  return (
    <div className="text-xs text-gray-500">
      <p>We accept:</p>
      <div className="flex gap-2 mt-2">
        {methods.map((method) => (
          <div key={method} className="bg-gray-100 p-1 rounded">
            <button
              className={`cursor-pointer p-2 ${paymentMethod === method ? "bg-blue-200" : ""}`}
              onClick={() => setPaymentMethod(method)}
            >
              {method}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
