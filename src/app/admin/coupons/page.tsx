"use client";

import React, { useState } from "react";
import { coupons as initialCoupons } from "@/data/coupons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { Plus } from "lucide-react";

export default function AdminCouponsPage() {
  const { toast } = useToast();
  const [list, setList] = useState(initialCoupons);

  const toggleCoupon = (code: string) => {
    setList(
      list.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    toast(`Coupon code ${code} active status changed.`, "info");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Coupon Codes
          </h1>
          <span className="text-xs text-zinc-400 mt-1 block">
            Configure store checkout deduction keys and usage limits.
          </span>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={16} />
          <span>New Coupon</span>
        </Button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Reduction Rate</th>
                <th className="px-6 py-4">Usage Count</th>
                <th className="px-6 py-4">Active Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {list.map((c) => (
                <tr key={c.code} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-zinc-950 dark:text-white">{c.code}</td>
                  <td className="px-6 py-4">
                    {c.discountType === "percentage"
                      ? `${c.discountValue}% Off`
                      : `$${c.discountValue} Off`}
                  </td>
                  <td className="px-6 py-4">{c.usageCount} times</td>
                  <td className="px-6 py-4">
                    <Badge variant={c.active ? "success" : "secondary"}>
                      {c.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => toggleCoupon(c.code)}>
                      {c.active ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
