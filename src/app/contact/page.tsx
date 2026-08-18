"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { brand } from "@/lib/brand";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StaticMap } from "@/components/ui/StaticMap";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

// Form Schema validation via Zod
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate contact form post response
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast("Thank you. Our support concierge will contact you within 24 hours.", "success");
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Contact Us", href: "/contact" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial mt-4">
        Connect With Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        {/* Left Side: Contact Form panel */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Your Name" {...register("fullName")} error={errors.fullName?.message} />
              <Input label="Email Address" type="email" {...register("email")} error={errors.email?.message} />
            </div>
            <Input label="Subject / Inquiry Topic" {...register("subject")} error={errors.subject?.message} />
            
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Message / Detail Request
              </label>
              <textarea
                rows={5}
                {...register("message")}
                className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-100 ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="How can our concierge team assist you..."
              />
              {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>}
            </div>

            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Send Inquiry
            </Button>
          </form>
        </div>

        {/* Right Side: Showroom Address & Showroom details panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Concierge Desk Details
            </h3>
            
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{brand.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{brand.contactPhone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{brand.contactAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{brand.hours}</span>
              </div>
            </div>
          </div>

          <StaticMap address={brand.contactAddress} />
        </div>
      </div>
    </div>
  );
}
