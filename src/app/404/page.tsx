"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Custom404Page() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial animate-pulse">
        404
      </h1>
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-editorial mt-4">
        Editorial Path Missing
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed">
        The design layout you are searching for does not exist or has been relocated to another collection directory.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="primary" className="px-6 py-2.5">
          Return to Journal
        </Button>
      </Link>
    </div>
  );
}
