"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CategorySection from "@/components/CategorySection";
import CreditSection from "@/components/CreditSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/NewsletterSection";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";

function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if user is authenticated and not coming from a payment page
    const fromPayment =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("from") === "payment";

    if (status === "authenticated" && !fromPayment) {
      if (session?.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  return (
    <div>
      <SpecialOfferBanner />
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <CreditSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default HomePage;
