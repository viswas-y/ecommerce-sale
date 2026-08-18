import React from "react";

interface StaticMapProps {
  address: string;
}

export const StaticMap: React.FC<StaticMapProps> = ({ address }) => {
  return (
    <div className="relative w-full h-[320px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-center p-6">
      {/* Editorial map background layout styling */}
      <div className="absolute inset-0 opacity-15 dark:opacity-5 mix-blend-overlay">
        <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-lg font-editorial font-bold text-lg mb-4">
          N
        </div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
          Novara Flagship showroom
        </h4>
        <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
          {address}
        </p>
        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mt-4">
          Interactive Map Connection Available in Production
        </span>
      </div>
    </div>
  );
};
