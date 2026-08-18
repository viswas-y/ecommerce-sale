import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-wide uppercase",
        {
          "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900": variant === "primary",
          "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200": variant === "secondary",
          "border border-zinc-200 text-zinc-800 dark:border-zinc-800 dark:text-zinc-200": variant === "outline",
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400": variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
