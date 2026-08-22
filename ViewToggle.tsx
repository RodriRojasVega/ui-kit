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
    // ELIMINAMOS el 'border border-border/50' y dejamos solo el contenedor flex (Punto 2)
    <div className={cn("inline-flex gap-1", className)}>
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
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground bg-transparent"
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