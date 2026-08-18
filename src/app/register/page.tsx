"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/useUiStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuthenticated } = useUiStore();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords do not match.", "error");
      return;
    }

    if (!agreeTerms) {
      toast("Please agree to the Terms of Service & Privacy Policy.", "info");
      return;
    }

    setIsLoading(true);

    // Simulate endpoint auth latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { setUser } = useUiStore.getState();
    setAuthenticated(true);
    setIsLoading(false);

    setUser({ name: name || "New User", email });

    toast(`Welcome, ${name || "User"}! Your account has been registered.`, "success");
    router.push("/account");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-8 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Create an Account
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Join Novara to track shipping states, save locations, and collect discount values.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="accent-zinc-950 dark:accent-white w-4 h-4 mt-0.5"
                required
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="underline font-medium hover:text-black dark:hover:text-white">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline font-medium hover:text-black dark:hover:text-white">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center text-xs py-2.5"
            >
              Register Account
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-4">
            <p className="text-xs text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-zinc-950 dark:text-white hover:underline uppercase tracking-wider text-[10px]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
