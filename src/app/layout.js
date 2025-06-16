"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  // Initialize AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  // Load Tawk.to chat script
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
        <link rel="icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://js.pusher.com/beams/2.1.0/push-notifications-cdn.js"
          strategy="afterInteractive"
          onLoad={() => setBeamsReady(true)}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
