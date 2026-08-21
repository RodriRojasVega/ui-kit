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

## 4. DualAsignador (DualAsignador.tsx)
Organismo complejo utilizado para flujos de asignación bidireccional (ej. Mover elementos de "Disponibles" a "Asignados"). Incorpora buscadores independientes para cada panel y un layout de doble columna.

### Propiedades
| Propiedad (Izq/Der) | Tipo | Descripción |
| :--- | :--- | :--- |
| childrenIzq | ReactNode | Elementos asignados. |
| childrenDer | ReactNode | Elementos disponibles. |

### Ejemplo de uso
import { DualAsignador } from '@/components/ui/DualAsignador';

export function AssignmentPanel() {
  return (
    <DualAsignador 
      childrenIzq={<div>Listado de asignados</div>}
      childrenDer={<div>Listado de disponibles</div>}
      tituloIzq="Equipo Asignado"
      tituloDer="Staff Disponible"
      onChangeBusquedaDer={(val) => console.log(val)}
    />
  );
}

---

## 5. DynamicIngredientRow (DynamicIngredientRow.tsx)
Componente estructural diseñado específicamente para formularios de recetas o Bill of Materials (BOM). Emplea un sistema de Grid-12 para alinear perfectamente los inputs e incluye un botón de eliminación.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| children | ReactNode | Elementos del formulario (Grid-12). |
| onRemove | function | Acción para eliminar la fila. |

### Ejemplo de uso
import { DynamicIngredientRow } from '@/components/ui/DynamicIngredientRow';
import { Input } from '@/components/ui/Input';

export function RecipeBuilder() {
  return (
    <DynamicIngredientRow onRemove={() => console.log('Remover fila')}>
      <div className="col-span-12 sm:col-span-8">
        {/* Selector de Insumos */}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <Input label="Cantidad (ml)" type="number" />
      </div>
    </DynamicIngredientRow>
  );
}

---

## 6. DynamicRow (DynamicRow.tsx)
Versión simplificada y genérica de la fila dinámica, ideal para listas secuenciales o pasos de preparación. Usa Flexbox.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| children | ReactNode | Contenido interno. |
| onRemove | function | Acción opcional de eliminación. |

### Ejemplo de uso
import { DynamicRow } from '@/components/ui/DynamicRow';

export function StepBuilder() {
  return (
    <DynamicRow onRemove={() => console.log('Paso eliminado')}>
      <span className="text-sm">Agitar vigorosamente.</span>
    </DynamicRow>
  );
}

---

## 7. InfoCard (InfoCard.tsx)
Tarjeta modular de información ideal para vistas de detalle y fichas técnicas. Soporta colores temáticos para el título y funcionalidad integrada de copiar al portapapeles.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| title | string | Título en monoespaciado. |
| value | string | Valor principal. |
| variant | string | Color semántico (primary, info, success, etc). |

### Ejemplo de uso
import { InfoCard } from '@/components/ui/InfoCard';

export function Details() {
  return (
    <InfoCard 
      title="Teléfono" 
      value="+56912345678" 
      copyText="+56912345678" 
      variant="info" 
    />
  );
}