"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { setCartOpen, setMobileNavOpen } = useUiStore();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Icon */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-2 -ml-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo Brand Title */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link
              href="/"
              className="text-xl font-bold uppercase tracking-widest text-zinc-950 dark:text-white font-editorial select-none"
            >
              {brand.logoText}
            </Link>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex space-x-8 text-xs font-semibold uppercase tracking-widest pl-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-amber-600 dark:text-amber-400 hover:opacity-80 transition"
            >
              Admin
            </Link>
          </nav>

          {/* Search bar + Profile & Utility Widgets */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="hidden lg:relative lg:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 xl:w-60 pl-8 pr-3 py-1.5 rounded-full border text-xs bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:outline-none focus:w-64 focus:border-zinc-400 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
            </form>

            <Link
              href="/account"
              aria-label="Account Settings"
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <User size={18} />
            </Link>

            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              className="relative text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="relative text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white p-1"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
