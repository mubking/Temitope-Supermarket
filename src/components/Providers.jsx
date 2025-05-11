// components/Providers.jsx
"use client";

import { CartProvider } from "@/contexts/CartContext";
import ToastWrapper from "./ToastWrapper";

export default function Providers({ children }) {
  return (
    <CartProvider>
      <ToastWrapper>{children}</ToastWrapper>
    </CartProvider>
  );
}
