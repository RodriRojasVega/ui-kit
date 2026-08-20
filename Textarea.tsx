// src/components/ui/Textarea.tsx
import { TextareaHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "w-full bg-background border rounded-lg px-3 py-2 text-sm text-foreground outline-none transition-colors custom-scrollbar resize-y",
          error 
            ? "border-danger focus:border-danger/80" 
            : "border-border focus:border-primary",
          className
        )}
        {...props}
      />
      {error && <span className="text-[10px] text-danger mt-1">{error}</span>}
    </div>
  );
}