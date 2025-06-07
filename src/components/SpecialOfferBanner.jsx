"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const SpecialOfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await axios.get(`/api/user-status?email=${session.user.email}`);
        if (!res.data?.hasReceivedFirstOrder) {
          setShouldShow(true);
        }
      } catch (err) {
        console.error("User status fetch error:", err);
      }
    };

    checkUserStatus();
  }, [session]);

  if (!isVisible || !shouldShow) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-2 relative">
      <p className="text-sm md:text-base">
        🎉 Free delivery on orders above ₦100,000 within Kwara State! Use code: <span className="font-bold">temitope</span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default SpecialOfferBanner;
