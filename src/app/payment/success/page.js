"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { useCart } from "@/contexts/CartContext";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { clearCart } = useCart() || {};

  useEffect(() => {
    clearCart();
    showToast({
      title: "Payment Successful",
      description: "Thank you! Your order is being processed.",
      status: "success",
      duration: 5000,
    });

    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-green-600">
        Payment successful! Redirecting...
      </h1>
    </div>
  );
}
