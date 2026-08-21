// src/components/ui/StepList.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Step {
  descripcion: string;
  isCritical?: boolean; // <- Nueva propiedad añadida
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
        <div 
          key={idx} 
          className={cn(
            "flex gap-4 text-sm text-foreground p-4 rounded-xl border shadow-sm relative overflow-hidden",
            step.isCritical ? "bg-danger/5 border-danger/30" : "bg-surface border-border"
          )}
        >
          {/* Barra lateral roja indicadora si es crítico */}
          {step.isCritical && <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger" />}
          
          {/* Círculo numérico */}
          <div className={cn(
            "flex shrink-0 items-center justify-center w-7 h-7 rounded-full font-mono font-bold text-xs border",
            step.isCritical ? "bg-danger/20 text-danger border-danger/30" : "bg-primary/15 text-primary border-primary/20"
          )}>
            {idx + 1}
          </div>
          
          <div className="flex-1 mt-0.5">
            {step.isCritical && (
              <span className="text-[9px] bg-danger text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mb-1.5 inline-block">
                Paso Crítico
              </span>
            )}
            <p className="leading-relaxed">{step.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}