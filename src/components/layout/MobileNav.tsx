"use client";

import React from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { brand } from "@/lib/brand";
import { AnimatePresence, motion } from "framer-motion";

export const MobileNav: React.FC = () => {
  const { isMobileNavOpen, setMobileNavOpen } = useUiStore();

  const links = [
    { label: "Shop Storefront", href: "/shop" },
    { label: "About Brand", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ Help Center", href: "/faq" },
    { label: "Editorial Blog", href: "/blog" },
    { label: "Admin Console", href: "/admin" },
  ];

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer sheet panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-80 max-w-full bg-white dark:bg-zinc-950 h-full p-6 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg uppercase tracking-widest text-zinc-950 dark:text-white font-editorial">
                  {brand.logoText}
                </span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-full text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Navigation links block */}
              <nav className="flex flex-col gap-5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="text-base font-medium tracking-wide text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer details within drawer */}
            <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                {brand.tagline}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
