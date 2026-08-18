"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CreditCard, RotateCcw, Headphones } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  // Entrance animations config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      } 
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <div className="overflow-hidden pb-16">
      {/* 1. Hero Showcase Block */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        {/* Absolute Background lifestyle graphic */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
            alt="Novara lifestyle collection"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-5" />

        {/* Content details overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs uppercase tracking-widest font-bold text-zinc-300"
            >
              Novara Editorial
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-editorial max-w-3xl leading-tight"
            >
              Elevate Your Everyday.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-zinc-200 max-w-lg font-light leading-relaxed"
            >
              Discover thoughtfully designed products made for modern, intentional living.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 mt-4">
              <Link href="/shop">
                <Button variant="primary" className="bg-white text-zinc-950 hover:bg-zinc-200">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Read Our Journal
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Categories Space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Browse Collections
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-2">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} name={cat.name} slug={cat.slug} image={cat.image} />
          ))}
        </div>
      </section>

      {/* 3. Trending Products Grid */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Curated Selection
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-2">
                Trending Right Now
              </h2>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white hover:opacity-85 flex items-center gap-1">
              <span>View all products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* 4. Luxury Editorial Promo Banner */}
      <section className="relative my-20 h-[50vh] md:h-[60vh] flex items-center bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="Promotion collection"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-md flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300">
              New Season / New Essentials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-editorial leading-tight">
              Minimal Designs, Infinite Comfort.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-light mt-1">
              Discover lightweight linen, premium tailored fabrics, and structural mocknecks designed to layer seamlessly.
            </p>
            <Link href="/shop?category=Fashion" className="mt-4">
              <Button variant="primary" className="bg-white text-zinc-950 hover:bg-zinc-200">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Top Sellers
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-2">
            The Essentials Collection
          </h2>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      {/* 6. Brand Core Values (Why Choose Us) */}
      <section className="border-t border-zinc-200 dark:border-zinc-900 mt-20 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center text-center p-4">
            <ShieldCheck size={32} className="text-zinc-400 mb-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Secure payments
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
              We process secure, encrypted transactions supporting standard digital gateways.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <CreditCard size={32} className="text-zinc-400 mb-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Free Shipping
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
              Complementary standard delivery is applied automatically on checkout orders over $100.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <RotateCcw size={32} className="text-zinc-400 mb-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Easy 30-Day Returns
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
              No questions asked return system using our online labels portals.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Headphones size={32} className="text-zinc-400 mb-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Premium Desk Support
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
              Reach out to our concierge advisors round-the-clock via support channels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
