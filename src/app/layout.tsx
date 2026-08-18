import React from "react";
import { Metadata } from "next";
import { ClientLayout } from "@/components/layout/ClientLayout";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "NOVARA — Premium Designer Essentials",
  description: "Discover thoughtfully designed clothing, workspace essentials, and home objects made for modern, intentional living.",
  keywords: ["ecommerce", "fashion", "workspace", "minimalist", "design", "next.js", "react", "template"],
  authors: [{ name: "NOVARA Atelier" }],
  openGraph: {
    title: "NOVARA — Premium Designer Essentials",
    description: "Discover thoughtfully designed clothing, workspace essentials, and home objects made for modern, intentional living.",
    type: "website",
    locale: "en_US",
    url: "https://novaradesign.com",
    siteName: "NOVARA",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVARA — Premium Designer Essentials",
    description: "Discover thoughtfully designed clothing, workspace essentials, and home objects made for modern, intentional living.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans-premium bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col justify-between">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
