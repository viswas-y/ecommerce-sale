"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";

import { useUiStore } from "@/store/useUiStore";

export default function ProfilePage() {
  const { toast } = useToast();
  const { user } = useUiStore();
  
  // Parse first and last name from user object details
  const nameParts = user?.name ? user.name.split(" ") : [];
  const defaultEmail = user?.email || "sarah.j@example.com";

  const [profile, setProfile] = useState({
    firstName: nameParts[0] || (user?.name ? user.name : "Sarah"),
    lastName: nameParts.slice(1).join(" ") || (user?.name ? "" : "Jenkins"),
    email: defaultEmail,
    phone: "+1 (555) 234-5678",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save updated name details back to UI store
    const { setUser } = useUiStore.getState();
    setUser({
      name: `${profile.firstName} ${profile.lastName}`.trim(),
      email: profile.email,
    });
    toast("Profile details updated successfully!", "success");
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-lg shadow-xs">
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-6">
        Profile Settings ({user?.name || "Guest"})
      </h2>
      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Input
            label="Last Name"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
        </div>
        <Input
          label="Email Address"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <Input
          label="Phone Number"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
        <Button variant="primary" type="submit">
          Save Settings
        </Button>
      </form>
    </div>
  );
}
