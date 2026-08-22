// src/components/ui/Calendar.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export interface CalendarEvent {
  id: number | string;
  title: string;
  date: string;
  status?: 'cotizacion' | 'confirmado' | 'en_produccion' | 'ejecutado' | 'cancelado';
}

interface CalendarProps {
  events: CalendarEvent[];
  year: number;
  month: number;
  onSelectEvent?: (eventId: number | string) => void;
  className?: string;
}

export function Calendar({ events, year, month, onSelectEvent, className }: CalendarProps) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    const dateKey = ev.date; 
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(ev);
    return acc;
  }, {});

  const gridCells = [];
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < offset; i++) {
    gridCells.push(<div key={`empty-${i}`} className="min-h-[90px] bg-surface-muted/30 border border-border/30 rounded-lg opacity-40" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayString = String(day).padStart(2, '0');
    const monthString = String(month + 1).padStart(2, '0');
    const dateKey = `${year}-${monthString}-${dayString}`;
    const dayEvents = eventsByDate[dateKey] || [];

    gridCells.push(
      <div 
        key={dateKey} 
        className="min-h-[90px] bg-surface border border-border rounded-xl p-2 flex flex-col gap-1 overflow-hidden transition-colors hover:border-primary/50"
      >
        <div className="flex justify-between items-center text-xs font-mono shrink-0">
          <span className="text-muted font-bold">{day}</span>
          {dayEvents.length > 0 && (
            <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full border border-primary/30 font-bold">
              {dayEvents.length}
            </span>
          )}
        </div>
        
        {/* Aquí estaba el problema: Mejoramos el área de scroll (pr-1 para la barra) y evitamos que los hijos rompan la caja */}
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar mt-1 pr-1">
          {dayEvents.map((ev) => {
            let statusColor = "bg-surface-muted text-muted border-border hover:bg-surface-muted/80";
            if (ev.status === 'confirmado') statusColor = "bg-sky-950/80 text-sky-300 border-sky-800/60 hover:bg-sky-900";
            if (ev.status === 'en_produccion') statusColor = "bg-amber-950/80 text-amber-300 border-amber-800/60 hover:bg-amber-900";
            if (ev.status === 'ejecutado') statusColor = "bg-primary/20 text-primary border-primary/40 hover:bg-primary/30";

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent?.(ev.id)}
                className={cn(
                  // Eliminamos el transform hover:scale que rompía los bordes, en su lugar usamos un hover de fondo suave
                  "text-[10px] font-sans px-2 py-1 rounded border truncate cursor-pointer transition-colors",
                  statusColor
                )}
                title={ev.title}
              >
                {ev.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="grid grid-cols-7 gap-2 mb-3 text-center text-[10px] font-mono uppercase text-muted font-bold">
        <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
      </div>

      <div className="grid grid-cols-7 gap-2 flex-1">
        {gridCells}
      </div>
    </div>
  );
}