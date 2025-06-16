"use client";
import CategorySection from "@/components/CategorySection";
import CreditSection from "@/components/CreditSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/NewsletterSection";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";

export default function HomePage() {
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
