"use client";

import React, { useState } from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial border-b border-zinc-200 dark:border-zinc-900 pb-5">
        My Account Area
      </h1>

      <div className="flex flex-col md:flex-row gap-10 mt-8">
        <AccountSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
