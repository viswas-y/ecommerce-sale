"use client";

import React, { useState } from "react";
import { useUiStore } from "@/store/useUiStore";
import { Dialog } from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useToast } from "@/components/provider/ToastProvider";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, setAuthenticated } = useUiStore();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate endpoint authentication latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const { setUser } = useUiStore.getState();
    setAuthenticated(true);
    setAuthModalOpen(false);
    setIsLoading(false);
    
    if (isSignUp) {
      const combinedName = `${firstName} ${lastName}`.trim();
      setUser({ name: combinedName || "Registered User", email });
      toast(`Welcome, ${combinedName || "User"}! Your account has been registered.`, "success");
    } else {
      // Set name from email prefix if logging in with new details
      const defaultName = email.split("@")[0];
      const parsedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      setUser({ name: parsedName, email });
      toast("Welcome back! Successfully logged into Novara.", "success");
    }
  };

  return (
    <Dialog
      isOpen={isAuthModalOpen}
      onClose={() => setAuthModalOpen(false)}
      title={isSignUp ? "Create an Account" : "Sign In to Novara"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {isSignUp
            ? "Join Novara to track shipping states, save locations, and collect discounts values."
            : "Access your personalized wishlist, track recent orders, and save your default shipping addresses."}
        </p>

        {isSignUp && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        )}

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

        <div className="pt-2">
          <Button variant="primary" type="submit" isLoading={isLoading} className="w-full justify-center">
            {isSignUp ? "Register Account" : "Sign In"}
          </Button>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition"
          >
            {isSignUp ? "Already have an account? Sign In" : "New User? Create an Account"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};
