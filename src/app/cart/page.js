// import CartPage from '@/components/CartPage'
// import React from 'react'

// function page() {
//   return (
//     <div>
//       <CartPage/>
//     </div>
//   )
// }

// export default page


"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";

import CartItem from "@/components/cart/CartItem";
import DeliveryForm from "@/components/cart/DeliveryForm";
import OrderSummary from "@/components/cart/OrderSummary";
import ReferralSection from "@/components/cart/ReferralSection";
import usePaystackVerification from "@/hooks/usePaystackVerification";

const CartPage = () => {
  const { data: session, status } = useSession();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const email = session?.user?.email || "";
  const [referralInput, setReferralInput] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    landmark: "",
    phone: "",
    pickupStore: "No. 10, Opposite Gada Market, Temitope Supermarket, Taiwo Isale",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [deliveryType, setDeliveryType] = useState("home");
  const [shippingOption, setShippingOption] = useState("Scheduled Delivery");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paystack");
  const [isProcessing, setIsProcessing] = useState(false);

  usePaystackVerification({ session, status, clearCart, showToast });

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/account/addresses", {
        headers: { session: `${email}` },
      })
        .then((res) => res.json())
        .then((data) => setSavedAddresses(data.addresses || []));
    }
  }, [status]);

  const formatCurrency = (value) =>
    typeof value === "number" ? `₦${value.toFixed(2)}` : "₦0.00";

  const calculatedSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleApplyReferral = () => {
    if (!referralInput.trim()) {
      return showToast({
        title: "No Code Entered",
        description: "Please enter a referral code before applying.",
        status: "error",
      });
    }

    if (referralInput === session?.user?.referralCode) {
      return showToast({
        title: "Invalid Referral",
        description: "You cannot use your own referral code.",
        status: "error",
      });
    }

    showToast({
      title: "Referral Saved",
      description: `You applied ${referralInput}`,
      status: "success",
    });
  };

  const handleOrderSubmit = async () => {
    if (status !== "authenticated" || !session) {
      showToast({
        title: "Login Required",
        description: "Please log in to place an order.",
        status: "error",
      });
      router.push("/login");
      return;
    }

    const missingFields =
      deliveryType === "home"
        ? !form.fullName || !form.address || !form.city || !form.phone || !date || !time
        : !form.fullName || !form.phone;

    if (missingFields) {
      showToast({
        title: "Missing Info",
        description: "Please complete all required fields.",
        status: "error",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const payload = {
        customer: form.fullName,
        amount: calculatedSubtotal,
        paymentMethod,
        status: paymentMethod === "Paystack" ? "Pending" : "Processing",
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/placeholder.svg",
        })),
        deliveryType,
        deliveryDetails: form,
        shippingOption,
        deliveryDate: date,
        deliveryTime: time,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: `${email}`,
        },
        body: JSON.stringify(payload),
      });

      const order = await res.json();

      if (paymentMethod === "Paystack") {
        const payRes = await fetch("/api/payment/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            session: `${session?.user?.id}`,
          },
          body: JSON.stringify({
            email: `${form.phone}@temitopepay.com`,
            amount: calculatedSubtotal * 100,
            metadata: { orderId: order._id },
          }),
        });

        const { authorization_url } = await payRes.json();
        window.location.href = authorization_url;
      } else {
        showToast({
          title: "Order Submitted",
          description: "We'll contact you for delivery.",
          status: "success",
        });
        clearCart();
      }
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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

            {/* CART ITEMS */}
            <div className="bg-white shadow-sm border-0 overflow-hidden">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">Your cart is empty</p>
                  <Link href="/" className="mt-4 inline-block text-blue-600">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="px-6">
                      <CartItem
                        item={item}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        formatCurrency={formatCurrency}
                      />
                      <div className="border-t border-gray-200" />
                    </div>
                  ))}
                  <ReferralSection
                    referralInput={referralInput}
                    setReferralInput={setReferralInput}
                    handleApplyReferral={handleApplyReferral}
                    clearCart={clearCart}
                  />
                </div>
              )}
            </div>

            {/* DELIVERY FORM */}
            <DeliveryForm
              form={form}
              setForm={setForm}
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              savedAddresses={savedAddresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
              shippingOption={shippingOption}
              setShippingOption={setShippingOption}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
            />

            {/* ORDER SUMMARY */}
            <OrderSummary
              formatCurrency={formatCurrency}
              calculatedSubtotal={calculatedSubtotal}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handleOrderSubmit={handleOrderSubmit}
              isProcessing={isProcessing}
              cart={cart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
