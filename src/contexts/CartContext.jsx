import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { data: session } = useSession();

  // 1️⃣ Load from localStorage initially (only for guests)
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  // 2️⃣ Save to localStorage on cart change (to persist for guests)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3️⃣ Load cart from DB if user is logged in
  useEffect(() => {
    const restoreCart = async () => {
      if (session?.user) {
        try {
          const res = await axios.get("/api/cart/get");
          const savedCart = res.data.cart;
          if (savedCart?.length) {
            setCart(savedCart);
          }
        } catch (err) {
          console.error("Failed to restore cart", err);
        }
      }
    };

    restoreCart();
  }, [session]);

  // 4️⃣ Save cart to DB for abandoned cart tracking
  useEffect(() => {
    const saveCartWithTimestamp = async () => {
      if (cart.length > 0 && session?.user) {
        try {
          await fetch("/api/cart/track-abandon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              cart,
              updatedAt: new Date().toISOString(),
            }),
          });
        } catch (err) {
          console.error("Failed to track abandoned cart", err);
        }
      }
    };

    saveCartWithTimestamp();
  }, [cart, session]);

  // Cart control functions
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
