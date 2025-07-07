"use client";

import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InstallPWAButton from "@/components/InstallPWAButton";

// ✅ Replace Geist with Inter
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  const [isBeamsReady, setBeamsReady] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          const interval = setInterval(() => {
            if (window.PusherPushNotifications) {
              clearInterval(interval);
              const beamsClient = new window.PusherPushNotifications.Client({
                instanceId: "f2db54f3-cea2-4b58-aee5-4c6f92cd9250",
              });

              beamsClient
                .start()
                .then(() => beamsClient.addDeviceInterest("admin"))
                .then(() => console.log("✅ Subscribed to admin notifications"))
                .catch(console.error);
            } else {
              console.warn("⏳ Waiting for Pusher SDK to load...");
            }
          }, 500);
        })
        .catch((err) => {
          console.error("❌ Service worker registration failed:", err);
        });
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/682257f9b3bf611904f06b53/1ir32fa4j";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4caf50" />
        <meta name="description" content="Buy fresh groceries online and get them delivered fast within Kwara State." />
        <meta property="og:title" content="Temitope Supermarket" />
        <meta property="og:description" content="Fresh groceries delivered to your door" />
        <meta property="og:image" content="/tslogo.png" />
        <meta property="og:url" content="https://www.temitope-supermarket.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/icons/install-option-svgrepo-com.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="antialiased">
        <Script
          src="https://js.pusher.com/beams/2.1.0/push-notifications-cdn.js"
          strategy="afterInteractive"
          onLoad={() => setBeamsReady(true)}
        />
        <Providers>{children}</Providers>
        <InstallPWAButton />
      </body>
    </html>
  );
}
