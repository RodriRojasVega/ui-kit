// src/components/ui/ModuleHeader.tsx
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

export interface ModuleHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badges?: ReactNode; // <-- Nueva prop para los "dodges" (etiquetas)
  showKpis?: boolean;
  onToggleKpis?: () => void;
  kpiButtonText?: string;
  primaryAction?: ReactNode;
  backAction?: () => void;
  backLabel?: string;
}

export function ModuleHeader({
  icon,
  title,
  subtitle,
  badges,
  showKpis,
  onToggleKpis,
  kpiButtonText = 'KPIs',
  primaryAction,
  backAction,
  backLabel = 'Volver'
}: ModuleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border shrink-0 animate-fade-in">
      <div className="flex items-center gap-3">
        {backAction && (
          <div className="pr-2 border-r border-border mr-1">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} onClick={backAction}>
              {backLabel}
            </Button>
          </div>
        )}
        
        {icon && (
          <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20 shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
            {/* Renderizado de Badges al lado del título */}
            {badges && <div className="flex items-center gap-2">{badges}</div>}
          </div>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onToggleKpis && (
          <Button 
            variant={showKpis ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={onToggleKpis}
          >
            {kpiButtonText}
          </Button>
        )}
        {primaryAction && primaryAction}
      </div>
    </div>
  );
}