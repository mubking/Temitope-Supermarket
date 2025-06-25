"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";

export default function PaymentVerifier() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();
  const { clearCart } = useCart();
  const { showToast } = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    const verifyAndClear = async () => {
      if (!reference || status !== "authenticated" || !session?.user?.id) return;

      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.status === "success") {
          await clearCart();

          showToast({
            title: "Payment Successful",
            description: "Your order has been confirmed and your cart was cleared.",
            status: "success",
            duration: 5000,
          });

          router.replace("/dashboard");
        } else {
          router.replace("/cart");
        }
      } catch (err) {
        console.error("Verification error:", err);
        router.replace("/cart");
      }
    };

    verifyAndClear();
  }, [reference, session, status]);

  return null; // No UI here — handled via toast + redirect
}
