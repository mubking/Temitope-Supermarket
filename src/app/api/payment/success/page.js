"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

export default function PaymentSuccess() {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    showToast({
      title: "Payment Successful",
      description: "We've received your payment. We're processing your order.",
      status: "success",
      duration: 7000,
    });
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    // Clear cart and show toast
    clearCart();
    showToast({
      title: "Payment Successful",
      description: "Thank you! Your order is being processed.",
      status: "success",
      duration: 5000,
    });

    // Redirect after a short delay
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
};

export default PaymentSuccessPage;

    setTimeout(() => {
      router.push("/"); // or order summary page
    }, 5000);
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Thank you for your payment! 🎉</h1>
      <p className="mt-4 text-gray-600">Redirecting you shortly...</p>
    </div>
  );
}
