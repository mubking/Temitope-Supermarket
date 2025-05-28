'use client';

import { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { CartProvider } from '../contexts/CartContext';
import ToastWrapper from '@/components/ToastWrapper';

function SyncCartAfterLogin() {
  const { data: session } = useSession();

  useEffect(() => {
    const syncCart = async () => {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (localCart.length === 0) return;

      try {
        await fetch('/api/cart/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: localCart }),
        });

        // Optional: clear local cart after syncing
        // localStorage.removeItem('cart');
      } catch (error) {
        console.error('Error syncing cart:', error);
      }
    };

    if (session?.user) {
      syncCart();
    }
  }, [session]);

  return null;
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <ToastWrapper>
          <SyncCartAfterLogin />
          {children}
        </ToastWrapper>
      </CartProvider>
    </SessionProvider>
  );
}
