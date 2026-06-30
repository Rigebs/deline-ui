export type ComponentCategory = 'forms' | 'feedback' | 'navigation' | 'data-display' | 'layout' | 'overlay';

export interface DocComponent {
  label: string;
  route: string;
  description: string;
  category: ComponentCategory;
  status?: 'stable' | 'beta' | 'new';
}

export const ALL_COMPONENTS: DocComponent[] = [
  // Forms
  { label: 'Input', route: '/components/input', description: 'Campo de texto controlado con FormControl.', category: 'forms', status: 'stable' },
  { label: 'Textarea', route: '/components/textarea', description: 'Área de texto multilínea con contador.', category: 'forms', status: 'stable' },
  { label: 'Select', route: '/components/select', description: 'Menú desplegable con búsqueda y agrupación.', category: 'forms', status: 'stable' },
  { label: 'Multi Select', route: '/components/multi-select', description: 'Selector múltiple con chips y agrupación.', category: 'forms', status: 'stable' },
  { label: 'Checkbox', route: '/components/checkbox', description: 'Casilla de verificación con estado indeterminado.', category: 'forms', status: 'stable' },
  { label: 'Radio', route: '/components/radio', description: 'Grupo de opciones exclusivas.', category: 'forms', status: 'stable' },
  { label: 'Toggle', route: '/components/toggle', description: 'Control binario de selección con etiqueta.', category: 'forms', status: 'stable' },
  { label: 'Date Picker', route: '/components/date-picker', description: 'Selector de fecha individual con calendario.', category: 'forms', status: 'stable' },
  { label: 'Date Range Picker', route: '/components/date-range-picker', description: 'Selector de rango de fechas.', category: 'forms', status: 'beta' },
  { label: 'File Upload', route: '/components/file-upload', description: 'Carga de archivos con drag & drop.', category: 'forms', status: 'stable' },
  { label: 'Form', route: '/components/form', description: 'Wrapper de formularios con submit/cancel.', category: 'forms', status: 'stable' },
  { label: 'Search', route: '/components/search', description: 'Campo de búsqueda con debounce.', category: 'forms', status: 'stable' },

  // Feedback
  { label: 'Alert', route: '/components/alert', description: 'Banner contextual informativo y dismissible.', category: 'feedback', status: 'stable' },
  { label: 'Toast', route: '/components/toast', description: 'Notificación temporal no intrusiva.', category: 'feedback', status: 'stable' },
  { label: 'Progress Bar', route: '/components/progress-bar', description: 'Barra de progreso determinada e indeterminada.', category: 'feedback', status: 'stable' },
  { label: 'Skeleton', route: '/components/skeleton', description: 'Placeholder de carga con efecto shimmer.', category: 'feedback', status: 'stable' },
  { label: 'Empty State', route: '/components/empty-state', description: 'Estado vacío con icono y descripción.', category: 'feedback', status: 'stable' },
  { label: 'Tooltip', route: '/components/tooltip', description: 'Información contextual al hacer hover.', category: 'feedback', status: 'stable' },

  // Navigation
  { label: 'Button', route: '/components/button', description: 'Botón con variantes, colores y loading.', category: 'navigation', status: 'stable' },
  { label: 'Tabs', route: '/components/tabs', description: 'Navegación por pestañas con indicador animado.', category: 'navigation', status: 'stable' },
  { label: 'Breadcrumb', route: '/components/breadcrumb', description: 'Miga de pan para navegación jerárquica.', category: 'navigation', status: 'stable' },
  { label: 'Pagination', route: '/components/pagination', description: 'Navegación entre páginas.', category: 'navigation', status: 'stable' },
  { label: 'Stepper', route: '/components/stepper', description: 'Indicador de progreso multi-paso.', category: 'navigation', status: 'stable' },
  { label: 'Dropdown Menu', route: '/components/dropdown-menu', description: 'Menú contextual con iconos y divisores.', category: 'navigation', status: 'stable' },
  { label: 'Accordion', route: '/components/accordion', description: 'Paneles expandibles/colapsables.', category: 'navigation', status: 'stable' },
  { label: 'Sidebar', route: '/components/sidebar', description: 'Barra lateral colapsable con navegación.', category: 'navigation', status: 'stable' },

  // Data Display
  { label: 'Table', route: '/components/table', description: 'Tabla de datos con columnas configurables.', category: 'data-display', status: 'stable' },
  { label: 'Badge', route: '/components/badge', description: 'Etiqueta visual para estados y categorías.', category: 'data-display', status: 'stable' },
  { label: 'Avatar', route: '/components/avatar', description: 'Representación visual del usuario.', category: 'data-display', status: 'stable' },
  { label: 'Card', route: '/components/card', description: 'Contenedor elevado para agrupar contenido.', category: 'data-display', status: 'stable' },

  // Overlay
  { label: 'Modal', route: '/components/modal', description: 'Ventana de diálogo modal con tamaños.', category: 'overlay', status: 'stable' },
];

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  forms: 'Formularios',
  feedback: 'Feedback',
  navigation: 'Navegación',
  'data-display': 'Data Display',
  layout: 'Layout',
  overlay: 'Overlay',
};

export const ALL_COMPONENTS_FLAT = ALL_COMPONENTS.map(c => ({
  ...c,
  categoryLabel: CATEGORY_LABELS[c.category],
}));
