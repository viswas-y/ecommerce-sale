"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Shipping Policy", href: "/shipping" }]} />

      <div className="mt-8">
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-6 mb-8">
          <Truck className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Shipping Information
          </h1>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
          <p className="text-zinc-500 font-light">
            Last Updated: August 18, 2026
          </p>

          <p>
            We strive to dispatch orders quickly. All items are inspected, packaged, and shipped from our fulfillment center in New York City.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            1. Dispatch & Processing Timelines
          </h2>
          <p>
            Standard orders require 1 to 2 business days to process and package prior to courier collection. Orders placed over weekends or regional holidays are prioritized on the next business day.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            2. Shipping Rates and Speeds
          </h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left text-xs border border-zinc-200 dark:border-zinc-800 rounded">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-3 font-semibold text-zinc-950 dark:text-white">Shipping Speed</th>
                  <th className="p-3 font-semibold text-zinc-950 dark:text-white">Transit Time</th>
                  <th className="p-3 font-semibold text-zinc-950 dark:text-white">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3">Standard Delivery</td>
                  <td className="p-3">3 – 5 business days</td>
                  <td className="p-3">$15.00 (Free for orders over $100)</td>
                </tr>
                <tr>
                  <td className="p-3">Express Delivery</td>
                  <td className="p-3">1 – 2 business days</td>
                  <td className="p-3">$30.00 flat rate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            3. Order Tracking
          </h2>
          <p>
            A tracking number will be emailed to you immediately after dispatch. You can monitor the courier delivery status from the link provided in the notification, or directly inside your profile account menu.
          </p>
        </div>
      </div>
    </div>
  );
}
