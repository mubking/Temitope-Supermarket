"use client";

import React from "react";
import { CgDanger } from "react-icons/cg";

const OrderSummary = ({
  formatCurrency,
  calculatedSubtotal,
  paymentMethod,
  setPaymentMethod,
  handleOrderSubmit,
  isProcessing,
  cart,
}) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Check Out Details</h2>

      <div className="bg-white shadow-sm border-0 overflow-hidden">
        <div className="p-6 space-y-4">
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
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>We accept:</p>
        <div className="flex gap-2 mt-2">
          <div className="bg-gray-100 p-1 rounded">
            <button
              className={`cursor-pointer p-2 ${paymentMethod === "Paystack" ? "bg-blue-200" : ""}`}
              onClick={() => setPaymentMethod("Paystack")}
            >
              Paystack Checkout
            </button>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <button
              className={`cursor-pointer p-2 ${paymentMethod === "Cash on Delivery" ? "bg-blue-200" : ""}`}
              onClick={() => setPaymentMethod("Cash on Delivery")}
            >
              Cash on Delivery
            </button>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <button
              className={`cursor-pointer p-2 ${paymentMethod === "Credit" ? "bg-blue-200" : ""}`}
              onClick={() => setPaymentMethod("Credit")}
            >
              Credit Option
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleOrderSubmit}
          disabled={isProcessing || cart.length === 0}
        >
          {isProcessing ? "Processing..." : `Proceed with ${paymentMethod}`}
        </button>
      </div>

      <div className="text-center mt-5 bg-[#DFF0D8] justify-center items-center gap-2 text-lg p-4 flex">
        <CgDanger />
        <h1>Please review your order and confirm all quantities before you pay</h1>
      </div>
    </div>
  );
};

export default OrderSummary;
