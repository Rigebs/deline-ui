import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink],
  templateUrl: './introduction.html',
})
export class Introduction {
  components = [
    { label: 'Button', route: '/components/button', description: 'Elemento interactivo para ejecutar acciones.' },
    { label: 'Card', route: '/components/card', description: 'Contenedor elevado para agrupar contenido.' },
    { label: 'Badge', route: '/components/badge', description: 'Etiqueta visual compacta para estados y categorías.' },
    { label: 'Toggle', route: '/components/toggle', description: 'Control binario de selección con etiqueta.' },
    { label: 'Avatar', route: '/components/avatar', description: 'Representación visual del usuario con iniciales o imagen.' },
    { label: 'Toast', route: '/components/toast', description: 'Notificación temporal no intrusiva.' },
    { label: 'Input', route: '/components/input', description: 'Campo de entrada de texto controlado.' },
    { label: 'Modal', route: '/components/modal', description: 'Ventana de diálogo modal para capturar atención o acciones del usuario.' },
    { label: 'Select', route: '/components/select', description: 'Menú desplegable con búsqueda y agrupación de opciones.' },
    { label: 'Tabs', route: '/components/tabs', description: 'Navegación por pestañas con indicador animado.' },
    { label: 'Empty State', route: '/components/empty-state', description: 'Estado vacío con icono, título y descripción.' },
    { label: 'Skeleton', route: '/components/skeleton', description: 'Placeholder de carga con efecto shimmer.' },
    { label: 'Pagination', route: '/components/pagination', description: 'Navegación entre páginas con control de tamaño.' },
    { label: 'Table', route: '/components/table', description: 'Tabla de datos con columnas configurables y hover.' },
    { label: 'Stepper', route: '/components/stepper', description: 'Indicador de progreso multi-paso secuencial.' },
    { label: 'Multi Select', route: '/components/multi-select', description: 'Selector múltiple con chips y agrupación.' },
    { label: 'File Upload', route: '/components/file-upload', description: 'Carga de archivos con drag & drop y previsualización.' },
    { label: 'Sidebar', route: '/components/sidebar', description: 'Barra lateral de navegación con iconos y colapso.' },
  ];
}
