import React from "react";
import { brand } from "@/lib/brand";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function AboutPage() {
  return (
    <div className="pb-16">
      {/* Editorial Header Hero Banner */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 py-16 border-b border-zinc-200/60 dark:border-zinc-905/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Breadcrumb items={[{ label: "Our Story", href: "/about" }]} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-4 block">
            About Novara
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-950 dark:text-white font-editorial mt-3 leading-tight">
            Designed for what matters.
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-6 leading-relaxed max-w-xl mx-auto text-sm sm:text-base font-light">
            We build collections that integrate clean silhouettes, certified organic raw materials, and high-end functional engineering.
          </p>
        </div>
      </section>

      {/* Main Core Narrative Editorial layout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wide">
            Our Mission & Philosophy
          </h3>
          <p>
            At Novara, our approach is minimalist and slow-paced. We believe in reducing visual noise to let tactile, natural qualities take center stage. Every item is detailed with intention, traceably sourced, and finished with care.
          </p>
          <p>
            By working with certified local family mills across Portugal, Italy, and Hangzhou, we verify fair wages and clean organic linen, wool, and leather production standards.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wide">
            Sustainable Craftsmanship
          </h3>
          <p>
            We are dedicated to building long-lasting wardrobes and living spaces. That means focusing on RWS-certified wool fibers, heavy organic waffle weaves, and Italian vegetable-tanned hides that acquire a beautiful patina over decades.
          </p>
          <p>
            Our packaging consists entirely of recycled cardboard envelopes and organic protective liners to reduce environmental impact.
          </p>
        </div>
      </section>

      {/* Corporate statistics board */}
      <section className="bg-zinc-950 text-white py-16 my-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-editorial text-amber-500">2023</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mt-2">Established</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-editorial text-amber-500">24k+</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mt-2">Items Shipped</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-editorial text-amber-500">100%</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mt-2">Organic Cotton</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-editorial text-amber-500">24/7</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mt-2">Concierge Desk</span>
          </div>
        </div>
      </section>
    </div>
  );
}
