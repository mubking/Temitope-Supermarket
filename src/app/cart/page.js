"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const displayCart = cart.length > 0 ? cart : [];

  const formatCurrency = (value) => {
    return typeof value === "number" ? `₦${value.toFixed(2)}` : "₦0.00";
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
        duration: 5000,
      });
      clearCart();
    }, 1500);
  };

  const CartItem = ({ item }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
      <div className="relative w-full sm:w-24 aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">Item ID: {item.id}</p>
        <div className="mt-3 flex items-center">
          <span className="font-medium text-lg">{formatCurrency(item.price)}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 mt-2 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
            aria-label="Decrease quantity"
            className="h-8 w-8"
          >
            -
          </button>
          <span className="w-10 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="h-8 w-8"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );

  // Calculate the subtotal dynamically by iterating over cart items
  const calculatedSubtotal = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Your Cart</h1>
              <Link href="/" className="text-blue-600 text-sm font-medium">
                Continue Shopping
              </Link>
            </div>

            <div className="bg-white shadow-sm border-0 overflow-hidden">
              {displayCart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">Your cart is empty</p>
                  <Link href="/" className="mt-4 inline-block text-blue-600">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {displayCart.map((item) => (
                    <div key={item.id} className="px-6">
                      <CartItem item={item} />
                      <div className="border-t border-gray-200" />
                    </div>
                  ))}

                  <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Discount code"
                        className="px-3 py-2 border border-gray-300 rounded-l-md"
                      />
                      <button className="border px-4 py-2">Apply</button>
                    </div>
                    <button
                      onClick={clearCart}
                      className="text-red-500 border px-4 py-2 border-red-500"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-80">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <div className="bg-white shadow-sm border-0 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(calculatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">{formatCurrency(calculatedSubtotal)}</span>
                </div>
                <button
                  className="w-full mt-4 bg-blue-600 text-white py-2"
                  disabled={displayCart.length === 0 || isProcessing}
                  onClick={handleCheckout}
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                </button>

                <div className="mt-4 text-xs text-gray-500">
                  <p>We accept:</p>
                  <div className="flex gap-2 mt-2 ">
                    <div className="bg-gray-100 p-1 rounded">
                       <button className="cursor-pointer bg-[] p-2">
                     paystack Checkout
                       </button>
                    </div>
                    <div className="bg-gray-100 p-1 rounded">
                       <button className="cursor-pointer bg-[] p-2">
                       cash on delivery
                       </button>
                    </div>
                    <div className="bg-gray-100 p-1 rounded">
                       <button className="cursor-pointer bg-[] p-2">
                        credit option
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default CartPage;
<button>

</button>