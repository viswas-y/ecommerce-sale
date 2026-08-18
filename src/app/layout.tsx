"use client";

import React from "react";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { ToastProvider } from "@/components/provider/ToastProvider";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { AuthModal } from "@/components/ui/AuthModal";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans-premium bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col justify-between">
        <ThemeProvider>
          <ToastProvider>
            <div>
              <AnnouncementBar />
              <Navbar />
              <MobileNav />
              <main>{children}</main>
            </div>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
            <AuthModal />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
