// app/cart/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CartItem from "@/components/CartItem";
import DeliveryForm from "@/components/DeliveryForm";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import SummarySection from "@/components/SummarySection";

const CartPage = () => {
  const { data: session, status } = useSession();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryType, setDeliveryType] = useState("home");
  const [shippingOption, setShippingOption] = useState("Scheduled Collection");
  const [referralInput, setReferralInput] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paystack");
  const router = useRouter();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const email = session?.user?.email || "";

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    landmark: "",
    phone: "",
    pickupStore: "No. 10, Opposite Gada Market, Temitope Supermarket, Taiwo Isale",
  });

  const formatCurrency = (value) => {
    return typeof value === "number" ? `₦${value.toFixed(2)}` : "₦0.00";
  };

  const calculatedSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === "authenticated") {
        const res = await fetch("/api/account/addresses", {
          headers: { session: `${email}` },
        });
        const data = await res.json();
        setSavedAddresses(data.addresses || []);
      }
    };
    fetchAddresses();
  }, [status]);

  const handleApplyReferral = () => {
    if (!referralInput.trim()) {
      showToast({
        title: "No Code Entered",
        description: "Please enter a referral code before applying.",
        status: "error",
        duration: 4000,
      });
      return;
    }
    if (referralInput === session?.user?.referralCode) {
      showToast({
        title: "Invalid Referral",
        description: "You cannot use your own referral code.",
        status: "error",
        duration: 4000,
      });
      return;
    }
    showToast({
      title: "Referral Saved",
      description: `You applied ${referralInput}`,
      status: "success",
      duration: 4000,
    });
  };

  const handleOrderSubmit = async () => {
    if (status === "loading") {
      showToast({
        title: "Please wait...",
        description: "Checking your login status.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    if (status !== "authenticated" || !session) {
      showToast({
        title: "Login Required",
        description: "Please log in to place an order.",
        status: "error",
        duration: 5000,
      });
      router.push("/login");
      return;
    }
    if (deliveryType === "home" && (!form.fullName || !form.address || !form.city || !form.phone || !shippingOption || !date || !time)) {
      showToast({
        title: "Missing Info",
        description: "Please fill in all required delivery fields before continuing.",
        status: "error",
        duration: 5000,
      });
      return;
    }
    if (deliveryType === "store" && (!form.fullName || !form.phone || !form.pickupStore)) {
      showToast({
        title: "Missing Info",
        description: "Please complete pickup information before placing your order.",
        status: "error",
        duration: 5000,
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
      if (!res.ok || !order?._id) throw new Error("Order creation failed or _id is missing");

      if (paymentMethod === "Paystack") {
        const payRes = await fetch("/api/payment/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            session: `${session?.user?.id}`,
          },
          body: JSON.stringify({
            email: form.phone ? `${form.phone}@temitopepay.com` : "guest@temitopepay.com",
            amount: calculatedSubtotal * 100,
            metadata: { orderId: order._id },
          }),
        });

        const payJson = await payRes.json();

        if (!payRes.ok || !payJson?.authorization_url) {
          showToast({
            title: "Payment Init Failed",
            description: payJson?.message || "Could not start payment. Try again.",
            status: "error",
            duration: 6000,
          });
          return;
        }

        window.location.href = payJson.authorization_url;
      } else {
        showToast({
          title: "Order Submitted",
          description: "Thank you! We'll contact you for delivery.",
          status: "success",
          duration: 6000,
        });
        clearCart();
      }
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: "Something went wrong while placing your order.",
        status: "error",
        duration: 5000,
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
              <Link href="/" className="text-blue-600 text-sm font-medium">Continue Shopping</Link>
            </div>

            <div className="bg-white shadow-sm border-0 overflow-hidden">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">Your cart is empty</p>
                  <Link href="/" className="mt-4 inline-block text-blue-600">Start Shopping</Link>
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
                  <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                      <input type="text" placeholder="Referral Code (optional)" value={referralInput} onChange={(e) => setReferralInput(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-l-md" />
                      <button className="border px-4 py-2" onClick={handleApplyReferral}>Apply</button>
                    </div>
                    <button onClick={clearCart} className="text-red-500 border px-4 py-2 border-red-500">Clear Cart</button>
                  </div>
                  <h2 className="text-[red] p-4">
                    NOTE: You can only redeem coupon code once and not with your personal code
                  </h2>
                </div>
              )}
            </div>

            <div className="p-4 max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">02 / Delivery Option</h1>
              <div className="flex gap-4 mb-6">
                <button className={`px-4 py-2 rounded ${deliveryType === "home" ? "bg-green-600 text-white" : "bg-gray-200"}`} onClick={() => setDeliveryType("home")}>Home Delivery</button>
                <button className={`px-4 py-2 rounded ${deliveryType === "store" ? "bg-green-600 text-white" : "bg-gray-200"}`} onClick={() => setDeliveryType("store")}>Collect in Store</button>
              </div>
              <DeliveryForm {...{ deliveryType, form, setForm, savedAddresses, selectedAddressId, setSelectedAddressId }} />
            </div>

            {deliveryType === "home" && (
              <div className="p-4 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">04 / Shipping Option</h1>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">Select a shipping option</label>
                  <select className="w-full border rounded p-2" value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                    <option>Scheduled Delivery</option>
                    <option>Urgent Delivery</option>
                  </select>
                </div>
                <p className="text-red-600 text-sm mb-4">Note: Final delivery window depends on time of payment.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1 text-gray-700">Select Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Select Time</label>
                    <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border rounded p-2">
                      <option value="">Select Time</option>
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 2:00 PM</option>
                      <option>2:00 PM - 4:00 PM</option>
                      <option>4:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <SummarySection {...{ calculatedSubtotal, formatCurrency }} />
            <div className="mt-4">
              <PaymentMethodSelector {...{ paymentMethod, setPaymentMethod }} />
            </div>

            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={handleOrderSubmit} disabled={isProcessing || cart.length === 0}>
                {isProcessing ? "Processing..." : `Proceed with ${paymentMethod}`}
              </button>
            </div>

            <div className="text-center mt-5 bg-[#DFF0D8] justify-center items-center gap-2 text-lg p-4 flex">
              <CgDanger />
              <h1>Please review your order and confirm all quantities before you pay</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
