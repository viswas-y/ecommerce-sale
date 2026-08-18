"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/brand";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderOpen,
  ClipboardList,
  Users,
  Warehouse,
  Percent,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Orders", href: "/admin/orders", icon: ClipboardList },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
    { label: "Coupons", href: "/admin/coupons", icon: Percent },
    { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-zinc-950 dark:bg-zinc-900 border-r border-zinc-900 text-zinc-400 min-h-screen flex flex-col justify-between p-6">
      <div>
        {/* Brand Header */}
        <div className="mb-10 px-2 flex flex-col">
          <Link
            href="/"
            className="text-lg font-bold text-white tracking-widest uppercase font-editorial"
          >
            {brand.name}
          </Link>
          <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold mt-1">
            Control Console
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-2.5 rounded text-sm font-semibold transition-all hover:bg-zinc-900 hover:text-white",
                  isActive && "bg-zinc-900 text-white border-l-2 border-amber-500"
                )}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to storefront link */}
      <div className="border-t border-zinc-900 pt-6">
        <Link
          href="/"
          className="text-xs uppercase font-bold text-zinc-500 hover:text-white transition flex items-center justify-between"
        >
          <span>Storefront View</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </aside>
  );
};
