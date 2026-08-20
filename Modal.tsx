// src/components/ui/Modal.tsx
import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop (Fondo oscuro) */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Contenedor del Modal */}
      <div 
        className={cn(
          "relative bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] animate-fade-in", 
          className
        )}
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-border shrink-0">
          <h3 className="text-sm font-bold font-mono text-primary uppercase tracking-wider">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-muted hover:text-foreground p-1 rounded-md hover:bg-surface-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido (Scrollable si es muy largo) */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}