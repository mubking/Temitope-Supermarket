"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InstallPWAButton from "@/components/InstallPWAButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isBeamsReady, setBeamsReady] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  // Register Service Worker and Initialize Pusher Beams
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

  // Load Tawk.to
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/682257f9b3bf611904f06b53/1ir32fa4j";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <head>
        
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4caf50" />
        <link rel="icon" href="/icons/install-option-svgrepo-com.svg" />
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
