import React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function FaqPage() {
  const faqs = [
    {
      id: "faq-1",
      title: "When will my order ship?",
      content: "All orders placed before 12pm EST ship within 1-2 business days. You will receive a tracking link via email once your package has left our fulfillment center."
    },
    {
      id: "faq-2",
      title: "What is your return policy?",
      content: "We accept returns of unworn, unwashed items in their original packaging within 30 days of delivery. Use our online returns portal to print a prepaid shipping label."
    },
    {
      id: "faq-3",
      title: "Do you ship internationally?",
      content: "Yes, we ship to Canada, Europe, and Australia. Customs fees and duties are calculated at checkout so there are no unexpected charges upon delivery."
    },
    {
      id: "faq-4",
      title: "Are your materials organic?",
      content: "We prioritize traceably sourced organic fabrics (GOTS certified linen and cotton) and RDS/RWS certified wool products. Check individual item details pages for origin details."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "FAQ / Help", href: "/faq" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial mt-4">
        Frequently Asked Questions
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
        Find quick answers regarding shipping rates, sizing details, and checkout options.
      </p>

      <div className="mt-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-lg shadow-xs">
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
