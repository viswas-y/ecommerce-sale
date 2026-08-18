"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Privacy Policy", href: "/privacy" }]} />

      <div className="mt-8">
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-6 mb-8">
          <Shield className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Privacy Policy
          </h1>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
          <p className="text-zinc-500 font-light">
            Last Updated: August 18, 2026
          </p>

          <p>
            At <strong>Novara Design Inc.</strong>, we prioritize the protection and confidentiality of your personal information. This Privacy Policy documents the type of data we gather, how we process it, and your security rights when using our website and services.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us when setting up an account, purchasing items, subscribing to newsletters, or contacting client desk support. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details (name, email address, phone number).</li>
            <li>Billing and shipping coordinates.</li>
            <li>Authentication parameters (usernames, hashed credentials).</li>
          </ul>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            2. How We Use Your Data
          </h2>
          <p>
            The collected data is processed to optimize your ecommerce experience, specifically to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Authorize payments and fulfill shipping orders.</li>
            <li>Provide real-time order tracking status updates.</li>
            <li>Transmit informational announcements, newsletters, or promotional campaigns.</li>
            <li>Perform diagnostics analysis to fix layout shifts and performance bottlenecks.</li>
          </ul>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            3. Security and Storage
          </h2>
          <p>
            We implement security algorithms to defend your credentials. However, no transmission protocol over the digital web is completely secure. We persist credentials in secure local stores or certified third-party auth platforms.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            4. Cookies and Tracking
          </h2>
          <p>
            Novara stores cookie values to track browser sessions, save theme provider state settings, and preserve items inside the cart drawer across refreshes.
          </p>
        </div>
      </div>
    </div>
  );
}
