"use client";

import React, { useState } from "react";
import { useToast } from "@/components/provider/ToastProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("NOVARA");
  const [email, setEmail] = useState("hello@novaradesign.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Store general settings updated.", "success");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Store Settings
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Configure storefront variables and backend endpoints placeholders.
        </span>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Store Display Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <Input
            label="Support Desk Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="primary" type="submit">
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
