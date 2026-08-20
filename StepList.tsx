// src/components/ui/StepList.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Step {
  descripcion: string;
}

interface StepListProps {
  steps: Step[];
  emptyMessage?: string;
  className?: string;
}

export function StepList({ steps, emptyMessage = "No hay pasos registrados.", className }: StepListProps) {
  if (!steps || steps.length === 0) {
    return (
      <p className="text-sm text-muted italic bg-surface p-4 rounded-xl border border-border">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4 text-sm text-foreground bg-surface p-4 rounded-xl border border-border shadow-sm">
          {/* Círculo numérico */}
          <div className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary font-mono font-bold text-xs border border-primary/20">
            {idx + 1}
          </div>
          <p className="leading-relaxed mt-1">{step.descripcion}</p>
        </div>
      ))}
    </div>
  );
}