// src/components/ui/ModuleHeader.tsx
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

export interface ModuleHeaderProps {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  badges?: ReactNode;
  showKpis?: boolean;
  onToggleKpis?: () => void;
  kpiButtonText?: string;
  primaryAction?: ReactNode;
  action?: ReactNode;
  backAction?: () => void;
  backLabel?: string;
  // NUEVA PROP: Permite colocar el botón volver a la derecha dentro de la botonera
  backOnRight?: boolean;
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
  action,
  backAction,
  backLabel = 'Volver',
  backOnRight = false
}: ModuleHeaderProps) {
  const renderAction = action || primaryAction;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border shrink-0 animate-fade-in">
      <div className="flex items-center gap-3">
        {/* Solo renderizamos a la izquierda si backAction existe y NO se pidió a la derecha */}
        {backAction && !backOnRight && (
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
            {badges && <div className="flex items-center gap-2">{badges}</div>}
          </div>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Si backOnRight es true y hay backAction, lo metemos primero en la botonera derecha */}
        {backAction && backOnRight && (
          <Button variant="secondary" size="sm" icon={<ArrowLeft size={15} />} onClick={backAction}>
            {backLabel}
          </Button>
        )}

        {onToggleKpis && (
          <Button 
            variant={showKpis ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={onToggleKpis}
          >
            {kpiButtonText}
          </Button>
        )}
        {renderAction && renderAction}
      </div>
    </div>
  );
}