// src/components/ui/InfoCard.tsx
import { useState, ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InfoCardProps {
  title: string;
  value?: string | number | null;
  copyText?: string;
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'purple';
  className?: string;
  children?: ReactNode;
}

export function InfoCard({
  title,
  value,
  copyText,
  variant = 'primary',
  className,
  children
}: InfoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = copyText || (typeof value === 'string' ? value : '');
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mapeo de colores variados para los títulos según el estándar de la app
  const titleColorClasses = {
    primary: 'text-primary',
    info: 'text-sky-400',
    success: 'text-success',
    warning: 'text-amber-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={cn("bg-surface border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm relative group", className)}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={cn("text-xs font-bold uppercase tracking-wider font-mono", titleColorClasses[variant])}>
          {title}
        </span>
        {copyText && (
          <button 
            onClick={handleCopy}
            className="text-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-surface-muted"
            title="Copiar información"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
        )}
      </div>
      
      <div className="text-sm font-medium text-foreground">
        {value !== undefined && value !== null && value !== '' ? (
          <span className="break-all">{value}</span>
        ) : (
          children || <span className="text-muted italic text-xs">No especificado</span>
        )}
      </div>
    </div>
  );
}