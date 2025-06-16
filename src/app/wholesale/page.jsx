'use client';
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function WholesalePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <DashboardNavbar />

            {/* Hero Section */}
            <section className="bg-green-600 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Wholesale Orders</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Buy more, save more! Get exclusive bulk pricing for resellers, event planners, and large households.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <main className="flex-grow py-16">
                <div className="container mx-auto px-4 max-w-3xl bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Order Wholesale from Us?</h2>

                    <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
                        <li>No membership or subscription fees</li>
                        <li>Minimum order value: ₦100,000</li>
                        <li>Exclusive bulk pricing & discounts (10+ units)</li>
                        <li>Next-day delivery (within Ilorin & nearby areas)</li>
                        <li>Special customer support for wholesalers</li>
                    </ul>

                    <div className="mb-8">
                        <p className="text-gray-700 mb-4">
                            We currently accept wholesale orders via WhatsApp or phone call. Our team is always ready to assist you and help fulfill your bulk grocery needs.
                        </p>
                        <a
                            href="https://wa.me/2349056116119"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition"
                        >
                            <FaWhatsapp className="text-xl" />
                            📦 Message Us on WhatsApp
                        </a>
                    </div>

                    <p className="text-sm text-gray-500">
                        For corporate inquiries or partnerships, please email us at{" "}
                        <a href="mailto:              temitopesupermarket@gmail.com
" className="text-blue-600 underline">
                            temitopesupermarket@gmail.com
                        </a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
