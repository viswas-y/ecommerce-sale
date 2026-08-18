import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg min-h-[300px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-editorial">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} className="mt-6">
          {actionText}
        </Button>
      )}
    </div>
  );
};
