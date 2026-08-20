// src/components/ui/PillNavigation.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PillOption {
  id: string;
  label: string;
}

interface PillNavigationProps {
  options: PillOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function PillNavigation({ options, activeId, onChange, className }: PillNavigationProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 overflow-x-auto custom-scrollbar pb-2", className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap border",
            activeId === option.id
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-surface border-border text-muted hover:text-foreground hover:border-primary/50"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}