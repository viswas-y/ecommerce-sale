"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Terms & Conditions", href: "/terms" }]} />

      <div className="mt-8">
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-6 mb-8">
          <FileText className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Terms of Service
          </h1>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
          <p className="text-zinc-500 font-light">
            Last Updated: August 18, 2026
          </p>

          <p>
            Welcome to Novara. These Terms of Service govern your access to and use of Novara's digital platform, purchases, and related tools. By browsing our catalog or creating an account, you agree to comply with these terms.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            1. Account Enrollment
          </h2>
          <p>
            You are responsible for safeguarding your account details. Any activity initiated from your profile credentials will be deemed authorized by you. Please notify us immediately if you suspect unauthorized entry.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            2. Orders, Catalog, and Pricing
          </h2>
          <p>
            All catalog specifications, availability states, and pricing lists are subject to correction without notice. We reserve the right to decline or cancel custom orders if details are inaccurate or fraudulent.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            3. Intellectual Property Rights
          </h2>
          <p>
            The layout structure, vector logos, editorial imagery, product text descriptions, and source files of the Novara project are protected by international trademark and copyright treaties. Any redistribution or reproduction without prior written permit is strictly prohibited.
          </p>

          <h2 className="text-base font-bold text-zinc-950 dark:text-white font-editorial uppercase tracking-wider mt-8 mb-2">
            4. Limitation of Liability
          </h2>
          <p>
            Novara Design Inc. is provided on an "as-is" basis. We do not guarantee continuous uptime or error-free rendering, nor do we assume responsibility for package shipment delays caused by third-party delivery dispatch hubs.
          </p>
        </div>
      </div>
    </div>
  );
}
