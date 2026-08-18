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

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
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
  );
};
