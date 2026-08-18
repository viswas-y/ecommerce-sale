"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-zinc-500 transition-transform duration-200",
                  isOpen && "transform rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "mt-2 text-sm text-zinc-600 dark:text-zinc-400 overflow-hidden transition-all duration-300 max-h-0",
                isOpen && "max-h-[500px]"
              )}
            >
              <div className="pb-2">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
