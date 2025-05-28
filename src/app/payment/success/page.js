"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "next-auth/react";

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const { showToast } = useToast();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Clear cart
    clearCart();

    // Show success toast
    showToast({
      title: "Payment Successful",
      description: "Thank you! Your order was successful.",
      status: "success",
      duration: 4000,
    });

    // Redirect after delay
    const timeout = setTimeout(() => {
      if (status === "authenticated") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Thank you for your payment! 🎉</h1>
      <p className="mt-4 text-gray-600">Redirecting you shortly...</p>
    </div>
  );
}
