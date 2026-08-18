import React from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  max = 99,
}) => {
  return (
    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="px-3 py-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 disabled:opacity-30"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="px-3 py-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 disabled:opacity-30"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
