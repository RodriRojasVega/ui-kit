// src/components/ui/DataCard.tsx
import { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DataCardProps {
  title: string;
  badge?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function DataCard({ title, badge, onClick, children, className }: DataCardProps) {
  const isClickable = !!onClick;

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between shadow-sm",
        isClickable && "cursor-pointer group hover:border-primary/40 hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className={cn(
            "text-base font-bold text-foreground transition-colors",
            isClickable && "group-hover:text-primary"
          )}>
            {title}
          </h3>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        
        {/* Contenedor flexible para los metadatos de la tarjeta */}
        <div className="space-y-1.5 text-xs text-muted mt-auto">
          {children}
        </div>
      </div>
    </div>
  );
}