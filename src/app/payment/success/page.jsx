"use client";

import PaymentVerifier from "@/components/PaymentVerifier";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-green-600 font-bold text-lg">
      <Suspense fallback={<p>Verifying payment...</p>}>
        {/* <PaymentVerifier /> */}




        <PaymentVerifier/>

      </Suspense>
    </div>
  );
}
