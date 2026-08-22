# UI Kit Maestro 2.2 - Manual de Referencia Técnica

Este documento contiene la especificación, propiedades y ejemplos de uso de los componentes modulares de la interfaz. Todos los componentes están construidos sobre React, utilizan Tailwind CSS para el diseño y dependen de `clsx` y `tailwind-merge` para la resolución dinámica de clases.

## 1. Badge (`Badge.tsx`)
Componente visual de solo lectura utilizado para resaltar estados, categorías o etiquetas con una tipografía monoespaciada para mayor legibilidad.

### Propiedades

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | Requerido | El texto o contenido interno del badge. |
| `variant` | `string` | `'default'` | Define el esquema de colores. Opciones: `'success'`, `'warning'`, `'danger'`, `'info'`, `'purple'`, `'default'`. |
| `size` | `string` | `'sm'` | Define el tamaño y padding. Opciones: `'sm'`, `'md'`. |
| `className`| `string` | `undefined` | Clases adicionales de Tailwind para sobrescribir o extender estilos. |

### Ejemplo de uso
```tsx
import { Badge } from '@/components/ui/Badge';

export function StatusIndicator() {
  return (
    <div className="flex gap-2">
      <Badge size="md" variant="success">Confirmado</Badge>
      <Badge variant="warning">Pendiente</Badge>
    </div>
  );
}
```

---

## 2. Button (`Button.tsx`)
Elemento interactivo principal que soporta múltiples variantes de diseño, tamaños e integración nativa de iconos, manteniendo un control estricto sobre los estados de *focus* y *disabled*.

### Propiedades

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | Opcional | Texto del botón. Puede omitirse si solo se usa un icono. |
| `variant` | `string` | `'primary'` | Estilo visual. Opciones: `'primary'`, `'secondary'`, `'danger'`, `'ghost'`, `'inline'`, `'inline-danger'`. |
| `size` | `string` | `'md'` | Dimensiones del botón. Opciones: `'sm'`, `'md'`, `'lg'`, `'inline'`. |
| `icon` | `ReactNode` | `undefined` | Icono renderizado a la izquierda del texto. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción y reduce la opacidad. |
| `...props` | `HTMLAttributes`| - | Soporta todas las propiedades nativas de `<button>`. |

### Ejemplo de uso
```tsx
import { Button } from '@/components/ui/Button';
import { Save, Trash } from 'lucide-react';

export function ActionBar() {
  return (
    <div className="flex gap-4">
      <Button icon="{<Save" size="{16}"/>} variant="primary">
        Guardar Cambios
      </Button>
      <Button disabled variant="ghost">
        Cancelar
      </Button>
      <Button icon="{<Trash" size="{12}"/>} variant="inline-danger">
        Eliminar
      </Button>
    </div>
  );
}
```

---

## 3. Calendar (Calendar.tsx)
Grilla mensual interactiva estructurada por año y mes, diseñada para visualizar eventos categorizados por estado con soporte para scroll interno por día.

### Propiedades

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `events` | `CalendarEvent[]` | Requerido | Arreglo de eventos a renderizar en la grilla. |
| `year` | `number` | Requerido | Año numérico a desplegar (ej. 2026). |
| `month` | `number` | Requerido | Índice numérico del mes (0 = Enero, 11 = Diciembre). |
| `onSelectEvent`| `function` | `undefined` | Callback que se ejecuta al hacer clic en un evento. Recibe el `id`. |
| `className`| `string` | `undefined` | Clases adicionales para el contenedor principal. |

### Interfaz `CalendarEvent`
```typescript
interface CalendarEvent {
  id: number | string;
  title: string;
  date: string; // Formato estricto 'YYYY-MM-DD'
  status?: 'cotizacion' | 'confirmado' | 'en_produccion' | 'ejecutado' | 'cancelado';
}
```

### Ejemplo de uso
```tsx
import { Calendar, type CalendarEvent } from '@/components/ui/Calendar';

const events: CalendarEvent[] = [
  { id: 1, title: 'Evento Corporativo', date: '2026-08-22', status: 'confirmado' }
];

export function MonthView() {
  return (
    <div className="h-[600px]">
      <Calendar events="{events}" month="{7}" onSelectEvent="{(id)" year="{2026}"> console.log(id)} />
    </div>
  );
}
```

## 8. Input (Input.tsx)
Campo de entrada minimalista, diseñado con borde inferior estilizado y soporte para prefijos o iconos.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| label | string | Etiqueta superior opcional. |
| icon | ReactNode | Icono opcional a la izquierda. |
| prefix | string | Prefijo de texto (ej. '$') a la izquierda. |
| ...props | InputHTMLAttributes | Soporta atributos nativos HTML de input. |

### Ejemplo de uso
```tsx
import { Input } from '@/components/ui/Input';

export function Form() {
  return <Input label="Precio" placeholder="0.00" prefix="$" type="number" />;
}
```

---

## 9. Modal (Modal.tsx)
Ventana emergente modal con efecto de backdrop blur, gestión de z-index y cierre automático con la tecla Escape.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| isOpen | boolean | Estado de visibilidad del modal. |
| onClose | function | Función para cerrar el modal. |
| title | string | Título del modal. |
| children | ReactNode | Contenido interno. |

### Ejemplo de uso
```tsx
import { Modal } from '@/components/ui/Modal';

export function Confirmation() {
  return (
    <Modal isOpen={true} onClose={() => {}} title="Confirmar Acción">
      <p>¿Estás seguro de continuar?</p>
    </Modal>
  );
}
```

---

## 10. ModuleHeader (ModuleHeader.tsx)
Cabecera estandarizada para módulos y centros de mando, con soporte para botones de retorno contextuales, alternadores de KPIs, insignias y acciones primarias personalizables.

### Propiedades
| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | Requerido | Título principal (puede ser texto o nodo). |
| `subtitle` | `string` | `undefined` | Subtítulo opcional descriptivo. |
| `icon` | `ReactNode` | `undefined` | Icono principal contenedor. |
| `badges` | `ReactNode` | `undefined` | Elementos de etiqueta o Badges asociados. |
| `showKpis` | `boolean` | `undefined` | Estado activo para el botón de toggle de KPIs. |
| `onToggleKpis` | `function` | `undefined` | Callback ejecutado al accionar el botón de KPIs. |
| `kpiButtonText`| `string` | `'KPIs'` | Texto del botón de métricas. |
| `primaryAction`| `ReactNode` | `undefined` | Nodo de acción principal a la derecha. |
| `action` | `ReactNode` | `undefined` | Nodo alternativo de acción (alias de primaryAction). |
| `backAction` | `function` | `undefined` | Función callback para el botón de retroceso. |
| `backLabel` | `string` | `'Volver'` | Texto personalizado del botón de retroceso. |
| `backOnRight`| `boolean` | `false` | Posiciona el botón de retroceso a la derecha dentro de la botonera. |

### Ejemplo de uso
```tsx
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Badge } from '@/components/ui/Badge';

export function HeaderExample() {
  return (
    <ModuleHeader backAction="{()"> console.log('Volver')} 
      title="Evento 001"
      badges={<Badge variant="success">Corporativo</Badge>}
    />
  );
}
```

---

## 11. PillNavigation (PillNavigation.tsx)
Navegación horizontal tipo "píldora", ideal para filtrar vistas sin cambiar de ruta.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| options | Array | { id: string, label: string }. |
| activeId | string | ID seleccionado. |
| onChange | function | Callback de cambio. |

### Ejemplo de uso
```tsx
import { PillNavigation } from '@/components/ui/PillNavigation';

export function FilterView() {
  const options = [{id: 'all', label: 'Todos'}, {id: 'active', label: 'Activos'}];
  return <PillNavigation activeId="all" onChange={(id) => console.log(id)} options={options} />;
}
```

## 12. Select (Select.tsx)
Menú desplegable estilizado con soporte para etiquetas superiores y un icono de chevron personalizado.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| label | string | Etiqueta superior opcional. |
| children | ReactNode | Elementos option internos. |
| ...props | SelectHTMLAttributes | Atributos nativos del elemento select. |

### Ejemplo de uso
```tsx
import { Select } from '@/components/ui/Select';

export function SelectExample() {
  return (
    <Select label="Categoría">
      <option value="1">Opción 1</option>
    </Select>
  );
}
```

---

## 13. Sidebar (Sidebar.tsx)
Panel de navegación lateral colapsable, ideal para layouts principales con soporte para logo y elementos de menú interactivos.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| items | NavItem[] | Arreglo de opciones de navegación. |
| activeId | string | ID de la opción activa. |
| isCollapsed | boolean | Estado de colapso del menú. |
| onToggleCollapse | function | Acción para alternar el colapso. |
| logo | ReactNode | Logo opcional para el encabezado. |

### Interfaz NavItem
```typescript
interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}
```

### Ejemplo de uso
```tsx
import { Sidebar, type NavItem } from '@/components/ui/Sidebar';
import { Home } from 'lucide-react';

export function Navigation() {
  const items: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: <Home size={18} />, onClick: () => {} }
  ];
  return <Sidebar items={items} activeId="home" isCollapsed={false} onToggleCollapse={() => {}} />;
}
```

---

## 14. StepList (StepList.tsx)
Renderizador de listas de pasos secuenciales numerados, con soporte para destacar pasos críticos con alertas visuales.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| steps | Step[] | Lista de pasos a renderizar. |
| emptyMessage | string | Mensaje opcional si la lista está vacía. |

### Interfaz Step
```typescript
interface Step {
  descripcion: string;
  isCritical?: boolean;
}
```

### Ejemplo de uso
```tsx
import { StepList } from '@/components/ui/StepList';

export function RecipeSteps() {
  const steps = [{ descripcion: 'Mezclar ingredientes', isCritical: false }];
  return <StepList steps={steps} />;
}
```

---

## 15. SummaryCard (SummaryCard.tsx)
Tarjeta métrica de resumen optimizada para mostrar KPIs y valores numéricos destacados con etiquetas opcionales.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| label | string | Etiqueta superior de la métrica. |
| value | ReactNode | Valor principal (número, texto o componente). |
| badge | ReactNode | Etiqueta o badge lateral opcional. |
| valueClassName | string | Clases CSS personalizadas para el valor. |

### Ejemplo de uso
```tsx
import { SummaryCard } from '@/components/ui/SummaryCard';
import { Badge } from '@/components/ui/Badge';

export function Metric() {
  return <SummaryCard label="Ventas Totales" value="$45.000" badge={<Badge variant="success">+12%</Badge>} />;
}

```

---

## 16. Table y Subcomponentes (Table.tsx)
Sistema completo de tablas de datos que incluye contenedores, cabeceras, filas interactivas, celdas alineadas, barra de herramientas con búsqueda y selector de límites, y paginación.

### Componentes y Propiedades Principales
- **Table**: Contenedor principal (`children`, `className`).
- **TableHead / TableBody**: Estructuras semánticas (`children`).
- **TableRow**: Fila de tabla (`isClickable`, `onClick`, `className`).
- **TableCell**: Celda de datos (`align`: 'left' | 'center' | 'right').
- **TableHeaderCell**: Celda de cabecera con soporte para ordenamiento (`isSortable`, `sortDirection`: 'asc' | 'desc' | null, `onSort`).
- **TableToolbar**: Barra superior de búsqueda y paginación (`busqueda`, `onBusquedaChange`, `placeholder`, `limite`, `onLimiteChange`).
- **TablePagination**: Pie de paginación (`paginaActual`, `totalPaginas`, `onCambiarPagina`, `elementosMostrados`, `totalElementos`).

### Ejemplo de uso
```tsx
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';

export function SimpleTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Elemento 1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

---

## 17. Tabs y TabPanel (Tabs.tsx)
Navegación por pestañas personalizables con soporte para iconos, colores temáticos activos y contenedores de panel condicionales.

### Propiedades de Tabs
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| tabs | TabItem[] | Arreglo de pestañas ({ id, label, icon?, activeColor? }). |
| activeTab | string | ID de la pestaña activa. |
| onChangeTab | function | Callback ejecutado al cambiar de pestaña. |

### Propiedades de TabPanel
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| id | string | Identificador asociado a la pestaña. |
| activeTab | string | Pestaña activa actual para controlar visibilidad. |
| children | ReactNode | Contenido del panel. |

### Ejemplo de uso
```tsx
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { useState } from 'react';

export function TabbedView() {
  const [active, setActive] = useState('tab1');
  const tabs = [{ id: 'tab1', label: 'General' }];
  return (
    <>
      <Tabs tabs={tabs} activeTab={active} onChangeTab={setActive} />
      <TabPanel id="tab1" activeTab={active}>
        <p>Contenido general</p>
      </TabPanel>
    </>
  );
}
```

---

## 18. Textarea (Textarea.tsx)
Campo de texto multilínea estilizado con soporte para manejo de errores de validación y redimensionamiento dinámico.

### Propiedades
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| error | string | Mensaje de error opcional renderizado debajo del área de texto. |
| ...props | TextareaHTMLAttributes | Atributos nativos de textarea. |

### Ejemplo de uso
```tsx
import { Textarea } from '@/components/ui/Textarea';

export function CommentBox() {
  return <Textarea placeholder="Escribe tus notas..." rows={4} />;
}
```

---

## 19. ViewToggle (ViewToggle.tsx)
Selector flotante y minimalista de modo de vista (por ejemplo, alternar entre grilla, calendario o lista) con soporte para iconos y estilos activos fluidos.

### Propiedades
| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `options` | `ViewOption[]` | Requerido | Arreglo de opciones ({ id, label, icon? }). |
| `activeId` | `string` | Requerido | ID de la vista seleccionada actualmente. |
| `onChange` | `function` | Requerido | Callback que recibe el ID de la nueva vista seleccionada. |
| `className`| `string` | `undefined` | Clases CSS adicionales para el contenedor. |

### Ejemplo de uso
```tsx
import { ViewToggle } from '@/components/ui/ViewToggle';

export function ToggleExample() {
  const views = [{ id: 'grid', label: 'Grilla' }, { id: 'list', label: 'Lista' }];
  return <ViewToggle activeId="grid" onChange="{(id)" options="{views}"> console.log(id)} />;
}
```

---

## 20. EventDashboardCard (EventDashboardCard.tsx)
Tarjeta de resumen ejecutiva diseñada específicamente para el Centro de Mando B2B, optimizada para mostrar métricas de aforo, locaciones o KPIs del evento con un diseño flotante y minimalista.

### Propiedades

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Requerido | Etiqueta descriptiva superior de la métrica. |
| `value` | `ReactNode` | Requerido | Valor principal destacado (número, texto o componente). |
| `icon` | `ReactNode` | `undefined` | Icono contextual opcional renderizado en la esquina superior. |
| `badge` | `ReactNode` | `undefined` | Etiqueta o Badge de estado opcional. |
| `className`| `string` | `undefined` | Clases adicionales de Tailwind para estilos personalizados. |

### Ejemplo de uso
```tsx
import { EventDashboardCard } from '@/components/ui/EventDashboardCard';
import { Badge } from '@/components/ui/Badge';
import { Users } from 'lucide-react';

export function KPIMetric() {
  return (
    <EventDashboardCard icon="{<Users" label="PAX Confirmados" size="{18}" value="600"/>} 
      badge={<Badge variant="success">Activo</Badge>} 
    />
  );
}