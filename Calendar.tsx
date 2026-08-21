// src/components/ui/Calendar.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export interface CalendarEvent {
  id: number | string;
  title: string;
  date: string; // Formato 'YYYY-MM-DD'
  status?: 'cotizacion' | 'confirmado' | 'en_produccion' | 'ejecutado' | 'cancelado';
}

interface CalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (eventId: number | string) => void;
  className?: string;
}

export function Calendar({ events, onSelectEvent, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Agrupar eventos por fecha 'YYYY-MM-DD'
  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    const dateKey = ev.date; 
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(ev);
    return acc;
  }, {});

  // Generar celdas de la grilla (Semana comienza en Lunes)
  const gridCells = [];
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < offset; i++) {
    gridCells.push(<div key={`empty-${i}`} className="min-h-[100px] bg-slate-950/20 border border-slate-900/50 rounded-lg opacity-20" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayString = String(day).padStart(2, '0');
    const monthString = String(month + 1).padStart(2, '0');
    const dateKey = `${year}-${monthString}-${dayString}`;
    const dayEvents = eventsByDate[dateKey] || [];

    gridCells.push(
      <div 
        key={dateKey} 
        className="min-h-[100px] bg-slate-900/40 border border-slate-800/80 rounded-xl p-2 flex flex-col gap-1 overflow-hidden transition-all hover:border-slate-700"
      >
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 font-bold">{day}</span>
          {dayEvents.length > 0 && (
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-900/40 font-bold">
              {dayEvents.length}
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar mt-1">
          {dayEvents.map((ev) => {
            // Estilos dinámicos según el estado del evento
            let statusColor = "bg-slate-800 text-slate-300 border-slate-700";
            if (ev.status === 'confirmado') statusColor = "bg-sky-950/80 text-sky-300 border-sky-800/60";
            if (ev.status === 'en_produccion') statusColor = "bg-amber-950/80 text-amber-300 border-amber-800/60";
            if (ev.status === 'ejecutado') statusColor = "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent?.(ev.id)}
                className={cn(
                  "text-[10px] font-sans px-2 py-1 rounded border truncate cursor-pointer transition-transform hover:scale-[1.02]",
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
    <div className={cn("bg-slate-950 border border-slate-900 rounded-2xl p-4 shadow-xl flex flex-col h-full", className)}>
      {/* Header del Calendario */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-900">
        <h2 className="text-base font-bold text-white tracking-wide font-sans">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-mono uppercase text-slate-500 font-bold">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
        <span>Dom</span>
      </div>

      {/* Grilla de días */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {gridCells}
      </div>
    </div>
  );
}