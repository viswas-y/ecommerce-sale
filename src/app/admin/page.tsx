"use client";

import React from "react";
import { AdminStats } from "@/components/admin/AdminStats";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const dataSales = [
  { name: "Mon", Sales: 4200 },
  { name: "Tue", Sales: 3800 },
  { name: "Wed", Sales: 6400 },
  { name: "Thu", Sales: 5200 },
  { name: "Fri", Sales: 7800 },
  { name: "Sat", Sales: 9200 },
  { name: "Sun", Sales: 11000 },
];

const dataCategories = [
  { name: "Fashion", value: 45 },
  { name: "Electronics", value: 30 },
  { name: "Home", value: 15 },
  { name: "Beauty", value: 10 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Overview Analytics
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Simulated Store Analytics console metrics.
        </span>
      </div>

      <AdminStats />

      {/* Recharts Analytics graphs visual charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Area Line chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-xs">
          <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 font-editorial mb-4">
            Weekly Sales History
          </h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSales}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Area type="monotone" dataKey="Sales" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Share by Category bar chart */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-xs">
          <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 font-editorial mb-4">
            Share by Department (%)
          </h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategories}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <RecentOrdersTable />
    </div>
  );
}
