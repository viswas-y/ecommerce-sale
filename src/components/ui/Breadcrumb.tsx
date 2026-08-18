import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex py-3 text-zinc-500 text-xs tracking-wider uppercase" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-zinc-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-zinc-800 dark:hover:text-zinc-200 transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
