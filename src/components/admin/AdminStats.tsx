"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-md text-zinc-500">{icon}</div>
      </div>
      <div className="flex items-center gap-1.5 mt-4">
        {trend === "up" ? (
          <ArrowUpRight size={16} className="text-green-500" />
        ) : (
          <ArrowDownRight size={16} className="text-red-500" />
        )}
        <span className={`text-xs font-bold ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {change}
        </span>
        <span className="text-xs text-zinc-400">vs last month</span>
      </div>
    </div>
  );
};

export const AdminStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value={formatPrice(48250)}
        change="+12.4%"
        trend="up"
        icon={<DollarSign size={18} />}
      />
      <StatsCard
        title="Orders"
        value="384"
        change="+8.2%"
        trend="up"
        icon={<ShoppingCart size={18} />}
      />
      <StatsCard
        title="Total Customers"
        value="1,248"
        change="+18.3%"
        trend="up"
        icon={<Users size={18} />}
      />
      <StatsCard
        title="Active Products"
        value="24"
        change="-0.5%"
        trend="down"
        icon={<Package size={18} />}
      />
    </div>
  );
};
