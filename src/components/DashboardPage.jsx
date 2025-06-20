'use client';

import { useEffect, useRef } from "react"; // ⬅️ Add useRef here
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/contexts/ToastContext"; // adjust path if needed

import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCartArrowDown, FaUser, FaLocationDot } from "react-icons/fa6";
import { BsFillCreditCardFill } from "react-icons/bs";

import Footer from "@/components/Footer";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const hasHandledPayment = useRef(false); // ✅ prevent duplicate toasts

useEffect(() => {
  if (status === 'authenticated' && session?.user?.isAdmin) {
    router.replace('/admin');

        return;

  }

  const paymentStatus = searchParams.get("payment");

  if (!hasHandledPayment.current) {
    if (paymentStatus === "success") {
      showToast({
        title: "Payment Successful ✅",
        description: "Thank you! We’ve received your payment.",
        status: "success",
        duration: 6000,
      });
      hasHandledPayment.current = true;
      router.replace("/dashboard", { scroll: false });
    }

    if (paymentStatus === "failed") {
      showToast({
        title: "Payment Failed ❌",
        description: "Something went wrong. Please try again or contact support.",
        status: "error",
        duration: 6000,
      });
      hasHandledPayment.current = true;
      router.replace("/dashboard", { scroll: false });
    }
  }
}, [status, session, searchParams, router, showToast]);



  // 🌀 Show loading while session is being fetched
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-600">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  // ❌ Block rendering for admin until redirected
  if (!session || session.user.isAdmin) return null;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Special Offer Banner */}
      <SpecialOfferBanner />
      <DashboardNavbar />

      <main className="flex-grow">
        {/* User-specific Dashboard Content */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Welcome, {session.user.firstName} {session.user.lastName}!
                </h1>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">Your coupon code:</div>
                  <span className="inline-block bg-gray-50 border border-green-200 text-green-700 font-mono rounded-full px-3 py-1 text-xs font-semibold">
                    <strong className="">
                      {session?.user?.referralCode || "Not available"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Promo Banner */}
              <div className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden rounded-lg border shadow-sm">
                {/* <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">
                    Share your coupon code with family, friends & foes to earn
                    commission
                  </h3>
                  <p className="text-gray-300 text-sm">
                    They will enjoy a one-time discount on their purchase on{" "}
                    <span className="text-green-400 font-semibold">
                      Temitope
                    </span>
                    .
                  </p>
                  <div className="mt-4">
                    <Link
                      href="#"
                      className="text-sm text-green-400 hover:text-green-300 underline"
                    >
                      Get your shareable coupon code link
                    </Link>
                    <p>
                      Your Referral Code:{" "}
                      <strong className="text-white">
                        {session?.user?.referralCode || "Not available"}
                      </strong>
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Dashboard Navigation */}
              <div className="mb-8 rounded-lg border bg-white shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
                    My Dashboard
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                    <Link href="/dashboard/orders">
                      <button
                        className={`flex flex-col items-center p-4 rounded-lg transition ${pathname === "/dashboard/orders"
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        <FaCartArrowDown className="h-5 w-5 mb-1" />
                        <span className="text-sm">My Orders History</span>
                      </button>
                    </Link>
                    <Link href="/account/profile">
                      <button
                        className={`flex flex-col items-center p-4 rounded-lg transition ${pathname === "/account/profile"
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        <FaUser className="h-5 w-5 mb-1" />
                        <span className="text-sm">Account Details</span>
                      </button>
                    </Link>

                    <Link href="/account/shipping">
                      <button
                        className={`flex flex-col items-center p-4 rounded-lg transition ${pathname === "/account/shipping"
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        <FaLocationDot className="h-5 w-5 mb-1" />
                        <span className="text-sm">Shipping Info</span>
                      </button>
                    </Link>

                    <Link href="/credit-application">
                      <button
                        className={`flex flex-col items-center p-4 rounded-lg transition ${pathname === "/credit-application"
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        <BsFillCreditCardFill className="h-5 w-5 mb-1" />
                        <span className="text-sm">Credit Application</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="rounded-lg border bg-white shadow-sm">
                <div className="p-6">
                  <h3 className="text-base font-semibold mb-2">
                    Customer Support
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <div className="flex items-center text-sm">
                      <FaPhoneAlt className="h-4 w-4 mr-2 text-green-600" />
                      <span>For supplies (wholesale) and enquiries:</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 text-sm font-medium">
                      <span>+234 905 611 6119</span>
                      <span>+234 903 735 2863</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Category Section */}
          <CategorySection />

          {/* Featured Products */}
          <FeaturedProducts />
        </section>
      </main>

      <Footer />
    </div>
  );
}
