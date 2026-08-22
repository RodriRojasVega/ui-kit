import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EventDashboardCardProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  valueClassName?: string;
  className?: string;
}

export function EventDashboardCard({
  label,
  value,
  icon,
  badge,
  valueClassName,
  className,
}: EventDashboardCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-4 rounded-xl border border-border bg-surface shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="p-1.5 rounded-md bg-surface-muted text-muted">
              {icon}
            </div>
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
            {label}
          </span>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>

      <div
        className={cn(
          "text-lg sm:text-xl font-bold font-mono truncate",
          valueClassName || "text-foreground"
        )}
      >
        {value}
      </div>
    </div>
  );
}