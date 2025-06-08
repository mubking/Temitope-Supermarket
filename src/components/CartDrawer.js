// components/CartDrawer.js
"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart() || {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-lg p-6 overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border p-3 rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 ml-3">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₦{item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-4 font-semibold text-lg">
              Total: ₦
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
