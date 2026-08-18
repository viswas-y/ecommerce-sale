"use client";

import React from "react";
import { brand } from "@/lib/brand";
import { useTheme } from "@/components/provider/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-zinc-950 dark:bg-zinc-900 border-b border-zinc-900 text-white py-2.5 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center select-none uppercase tracking-widest text-[10px]">
          {brand.announcementBar}
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-1 rounded-full text-zinc-400 hover:text-zinc-50 transition active:scale-95"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </div>
  );
};
