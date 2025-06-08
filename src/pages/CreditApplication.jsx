"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
import CreditApplicationForm from "../components/CreditApplicationForm";

const CreditApplication = () => {
  const { data: session } = useSession() || {};
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/credit/status?email=${session.user.email}`);
        const data = await res.json();

        if (data.status === "not_found") {
          setStatus("not_applied");
        } else {
setStatus(data.application?.creditStatus || "not_applied");
        }
      } catch (err) {
        console.error("Status fetch error:", err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Checking application status...</p>
          ) : status === "not_applied" ? (
            <CreditApplicationForm />
          ) : (
            <div className="bg-white shadow-md rounded p-6 text-center max-w-md mx-auto">
              <h2 className="text-lg font-bold mb-2">Credit Application Status</h2>
              <p className="text-sm text-gray-600 mb-4">You have already submitted a credit application.</p>
            <span
  className={`inline-block px-4 py-2 rounded text-white text-sm font-semibold ${
    status === "Approved"
      ? "bg-green-600"
      : status === "Rejected"
      ? "bg-red-600"
      : "bg-yellow-500"
  }`}
>
  {status}
</span>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreditApplication;
