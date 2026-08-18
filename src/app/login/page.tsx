"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/useUiStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { setAuthenticated } = useUiStore();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate endpoint auth latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { setUser } = useUiStore.getState();
    setAuthenticated(true);
    setIsLoading(false);

    const defaultName = email.split("@")[0];
    const parsedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    setUser({ name: parsedName, email });

    toast("Welcome back! Successfully logged into Novara.", "success");
    router.push("/account");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-8 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Sign In to Novara
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Access your order history, saved addresses, and profile settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-zinc-950 dark:accent-white w-3.5 h-3.5"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => toast("Reset link sent to your email (simulated).", "info")}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition"
            >
              Forgot Password?
            </button>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center text-xs py-2.5"
            >
              Sign In
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-4">
            <p className="text-xs text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-zinc-950 dark:text-white hover:underline uppercase tracking-wider text-[10px]"
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
