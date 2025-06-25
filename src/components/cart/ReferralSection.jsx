"use client";

import React from "react";

const ReferralSection = ({
  referralInput,
  setReferralInput,
  handleApplyReferral,
  clearCart,
}) => {
  return (
    <>
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Referral Code (optional)"
            value={referralInput}
            onChange={(e) => setReferralInput(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-l-md"
          />
          <button
            className="border px-4 py-2"
            onClick={handleApplyReferral}
          >
            Apply
          </button>
        </div>
        <button
          onClick={clearCart}
          className="text-red-500 border px-4 py-2 border-red-500"
        >
          Clear Cart
        </button>
      </div>
      <h2 className="text-[red] p-4">
        NOTE: You can only redeem coupon code once and not with your personal code
      </h2>
    </>
  );
};

export default ReferralSection;
