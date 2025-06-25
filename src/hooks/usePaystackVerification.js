"use client";

import { useEffect } from "react";

export default function usePaystackVerification({ session, status, clearCart, showToast }) {
  useEffect(() => {
    const verifyPayment = async () => {
      const url = new URL(window.location.href);
      const reference = url.searchParams.get("reference");

      if (!reference) return;

      if (status !== "authenticated" || !session?.user?.id) {
        setTimeout(verifyPayment, 1000);
        return;
      }

      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.status === "success") {
          // ✅ 1. Clear LOCAL cart (React Context / localStorage)
          clearCart();

          // ✅ 2. Clear DB cart
          await fetch("/api/cart/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              items: [], // Empty array = clear cart
            }),
          });

          // ✅ 3. Clean URL
          url.searchParams.delete("reference");
          window.history.replaceState({}, document.title, url.pathname);

          // ✅ 4. Notify and redirect
          showToast({
            title: "Payment Successful",
            description: "Your order was confirmed and your cart is now empty.",
            status: "success",
          });

          setTimeout(() => {
            window.location.replace("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
      }
    };

    verifyPayment();
  }, [status, session]);
}
