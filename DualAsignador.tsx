// src/components/ui/DualAsignador.tsx
import { ReactNode } from 'react';
import { Input } from './Input';

interface DualAsignadorProps {
  // Panel Izquierdo (Asignados)
  tituloIzq?: string;
  contadorIzq?: number;
  iconoIzq?: ReactNode;
  placeholderBusquedaIzq?: string;
  valorBusquedaIzq?: string;
  onChangeBusquedaIzq?: (val: string) => void;
  childrenIzq: ReactNode;

  // Panel Derecho (Disponibles)
  tituloDer?: string;
  contadorDer?: number;
  iconoDer?: ReactNode;
  placeholderBusquedaDer?: string;
  valorBusquedaDer?: string;
  onChangeBusquedaDer?: (val: string) => void;
  childrenDer: ReactNode;
}

export function DualAsignador({
  tituloIzq = "Asignados",
  contadorIzq,
  iconoIzq,
  placeholderBusquedaIzq = "Buscar...",
  valorBusquedaIzq,
  onChangeBusquedaIzq,
  childrenIzq,

  tituloDer = "Disponibles",
  contadorDer,
  iconoDer,
  placeholderBusquedaDer = "Buscar...",
  valorBusquedaDer,
  onChangeBusquedaDer,
  childrenDer,
}: DualAsignadorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
      
      {/* Panel Izquierdo (Asignados) */}
      <div className="flex flex-col border border-border rounded-xl bg-surface overflow-hidden">
        <div className="bg-background px-4 py-3 border-b border-border flex items-center justify-between text-xs font-bold text-foreground uppercase">
          <span className="flex items-center gap-2">
            {iconoIzq} {tituloIzq} {contadorIzq !== undefined && `(${contadorIzq})`}
          </span>
        </div>
        
        {onChangeBusquedaIzq && (
          <div className="p-3 border-b border-border bg-surface-muted/50">
            <Input 
              placeholder={placeholderBusquedaIzq}
              value={valorBusquedaIzq || ''}
              onChange={(e) => onChangeBusquedaIzq(e.target.value)}
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar max-h-[280px]">
          {childrenIzq}
        </div>
      </div>

      {/* Panel Derecho (Disponibles) */}
      <div className="flex flex-col border border-border rounded-xl bg-surface overflow-hidden">
        <div className="bg-background px-4 py-3 border-b border-border flex items-center justify-between text-xs font-bold text-foreground uppercase">
          <span className="flex items-center gap-2">
            {iconoDer} {tituloDer} {contadorDer !== undefined && `(${contadorDer})`}
          </span>
        </div>

        {onChangeBusquedaDer && (
          <div className="p-3 border-b border-border bg-surface-muted/50">
            <Input 
              placeholder={placeholderBusquedaDer}
              value={valorBusquedaDer || ''}
              onChange={(e) => onChangeBusquedaDer(e.target.value)}
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar max-h-[280px]">
          {childrenDer}
        </div>
      </div>

    </div>
  );
}