"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({ once: true }); // ✅ Add this

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").then(() => {
        if (!window.PusherPushNotifications) {
          console.error("❌ Pusher SDK not loaded.");
          return;
        }

        const beamsClient = new window.PusherPushNotifications.Client({
          instanceId: "f2db54f3-cea2-4b58-aee5-4c6f92cd9250",
        });

        beamsClient.start()
          .then(() => beamsClient.addDeviceInterest("admin"))
          .then(() => console.log("✅ Subscribed to admin notifications"))
          .catch(console.error);
      }).catch(err => {
        console.error("Service worker registration failed:", err);
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
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://js.pusher.com/beams/2.1.0/push-notifications-cdn.js"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
