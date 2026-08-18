"use client";

import React, { use } from "react";
import { customers } from "@/data/orders";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, UserCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default function AdminCustomerDetailPage({ params }: DetailProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const cust = customers.find((c) => c.id === id);

  if (!cust) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers">
          <Button variant="outline" size="sm">
            <ArrowLeft size={14} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Customer Profile: {cust.name}
          </h1>
          <span className="text-xs text-zinc-400 mt-1 block">
            Member since {cust.joinedDate} &bull; Email: {cust.email}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Contact Details
          </h3>
          <div className="text-sm space-y-2 text-zinc-700 dark:text-zinc-300">
            <div className="flex justify-between">
              <span>Primary Phone</span>
              <span className="font-semibold text-zinc-950 dark:text-white">{cust.phone || "Not Provided"}</span>
            </div>
            <div className="flex justify-between">
              <span>Account Status</span>
              <Badge variant={cust.status === "Active" ? "success" : "secondary"}>{cust.status}</Badge>
            </div>
          </div>
        </div>

        {/* Purchase metrics summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Purchasing Metrics
          </h3>
          <div className="text-sm space-y-2 text-zinc-700 dark:text-zinc-300">
            <div className="flex justify-between">
              <span>Total Orders Count</span>
              <span className="font-semibold text-zinc-950 dark:text-white">{cust.ordersCount} Orders</span>
            </div>
            <div className="flex justify-between">
              <span>Total Store Spent</span>
              <span className="font-bold text-zinc-950 dark:text-white">{formatPrice(cust.totalSpent)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
