"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RotateCcw } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Returns Policy", href: "/returns" }]} />

      <div className="mt-8">
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-6 mb-8">
          <RotateCcw className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Returns & Exchanges
          </h1>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
          <p className="text-zinc-500 font-light">
            Last Updated: August 18, 2026
          </p>

          <p>
            We take pride in the quality of our premium designer products. If an item does not meet your expectations, we offer simple 30-day returns.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            1. Return Window & Eligibility
          </h2>
          <p>
            Items must be returned within 30 days of the delivery date. To qualify, products must:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Be in their original, unused, and unworn condition.</li>
            <li>Maintain all tags, labels, and original protective wrapping.</li>
            <li>Be enclosed in the original packaging box.</li>
          </ul>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            2. Return Process
          </h2>
          <p>
            To initiate a return:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Log into your account portal or visit the Returns link in your order notification.</li>
            <li>Select the order reference and state the reason for your return.</li>
            <li>Generate and print the prepaid return label.</li>
            <li>Drop off the package at any authorized shipping courier location.</li>
          </ol>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            3. Refunds
          </h2>
          <p>
            Once received and audited by our QC desk, refunds are authorized immediately to your original payment card. Please allow 5 to 10 business days for the transaction credit statement to reflect on your account ledger.
          </p>
        </div>
      </div>
    </div>
  );
}
