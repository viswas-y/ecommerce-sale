import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const AccountSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Profile Settings", href: "/account" },
    { label: "Order History", href: "/account/orders" },
    { label: "My Wishlist", href: "/wishlist" },
    { label: "Saved Addresses", href: "/account/addresses" },
  ];

  return (
    <aside className="w-full md:w-64 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 flex flex-col gap-1 text-sm bg-white dark:bg-zinc-950 shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 px-3">
        Account Menu
      </h3>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "px-3 py-2.5 rounded transition hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium",
              isActive && "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
};
