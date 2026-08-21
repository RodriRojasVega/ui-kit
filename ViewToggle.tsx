// src/components/ui/ViewToggle.tsx
import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export interface ViewOption {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface ViewToggleProps {
  options: ViewOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function ViewToggle({ options, activeId, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn("inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1", className)}>
      {options.map((opt) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer outline-none",
              isActive
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            {opt.icon && <span>{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}