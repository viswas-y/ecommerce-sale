"use client";

import React from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info column */}
          <div className="lg:col-span-2">
            <span className="text-xl font-bold uppercase tracking-widest text-zinc-950 dark:text-white font-editorial">
              {brand.logoText}
            </span>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4 max-w-sm leading-relaxed">
              {brand.tagline} Discover premium designer essentials built, stitched, and structured for modern living.
            </p>
            <div className="flex gap-4 mt-6">
              {Object.entries(brand.socials).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Shop Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/shop?category=Fashion" className="hover:text-zinc-950 dark:hover:text-white transition">Fashion</Link></li>
              <li><Link href="/shop?category=Electronics" className="hover:text-zinc-950 dark:hover:text-white transition">Electronics</Link></li>
              <li><Link href="/shop?category=Home%20%26%20Living" className="hover:text-zinc-950 dark:hover:text-white transition">Furniture</Link></li>
              <li><Link href="/shop?category=Beauty%20%26%20Cosmetics" className="hover:text-zinc-950 dark:hover:text-white transition">Beauty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Customer Desk
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-zinc-950 dark:hover:text-white transition">FAQ / Returns</Link></li>
              <li><Link href="/about" className="hover:text-zinc-950 dark:hover:text-white transition">Brand Story</Link></li>
              <li><Link href="/blog" className="hover:text-zinc-950 dark:hover:text-white transition">Our Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Newsletter
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-3">
              Subscribe to receive private preview sales notifications.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs px-3.5 py-2.5 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition"
              />
              <button
                type="submit"
                className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-4 flex items-center justify-center hover:opacity-90 active:scale-95"
              >
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-zinc-900 mt-12 pt-8 text-xs text-zinc-400">
          <span>&copy; {new Date().getFullYear()} {brand.name} Inc. All rights reserved.</span>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition">Terms of Sale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
