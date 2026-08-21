import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from './Button';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  special?: boolean; // <-- Añade esta línea
}

interface SidebarProps {
  items: NavItem[];
  activeId: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  logo?: ReactNode;
  className?: string;
}

export function Sidebar({
  items,
  activeId,
  isCollapsed,
  onToggleCollapse,
  logo,
  className
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-surface border-r border-border transition-all duration-300 ease-in-out shrink-0",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Header del Sidebar (Logo y Botón Colapsar) */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border shrink-0",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex items-center font-bold text-foreground text-lg truncate">
            {logo || <span>Menu</span>}
          </div>
        )}
        
        {/* En móvil o tablet, el botón de colapsar es crucial */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn("text-muted hover:text-foreground", isCollapsed && "mx-auto")}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Lista de Navegación */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 outline-none",
                isCollapsed ? "justify-center" : "justify-start",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:bg-surface-muted hover:text-foreground"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="truncate text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}