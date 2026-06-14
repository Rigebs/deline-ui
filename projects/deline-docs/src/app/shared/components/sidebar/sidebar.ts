import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface SidebarGroup {
  title: string;
  items: { label: string; route: string; disabled?: boolean }[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  router = inject(Router);

  groups: SidebarGroup[] = [
    {
      title: 'Primeros Pasos',
      items: [
        { label: 'Introducción', route: '/' },
        { label: 'Instalación', route: '/installation' },
      ],
    },
    {
      title: 'Componentes',
      items: [
        { label: 'Accordion', route: '/components/accordion' },
        { label: 'Alert', route: '/components/alert' },
        { label: 'Avatar', route: '/components/avatar' },
        { label: 'Badge', route: '/components/badge' },
        { label: 'Breadcrumb', route: '/components/breadcrumb' },
        { label: 'Button', route: '/components/button' },
        { label: 'Card', route: '/components/card' },
        { label: 'Checkbox', route: '/components/checkbox' },
        { label: 'Date Picker', route: '/components/date-picker' },
        { label: 'Dropdown Menu', route: '/components/dropdown-menu' },
        { label: 'Empty State', route: '/components/empty-state' },
        { label: 'Form', route: '/components/form' },
        { label: 'Input', route: '/components/input' },
        { label: 'Modal', route: '/components/modal' },
        { label: 'Multi Select', route: '/components/multi-select' },
        { label: 'Progress Bar', route: '/components/progress-bar' },
        { label: 'Radio', route: '/components/radio' },
        { label: 'Search', route: '/components/search' },
        { label: 'Select', route: '/components/select' },
        { label: 'Skeleton', route: '/components/skeleton' },
        { label: 'Tabs', route: '/components/tabs' },
        { label: 'Textarea', route: '/components/textarea' },
        { label: 'Toast', route: '/components/toast' },
        { label: 'Toggle', route: '/components/toggle' },
        { label: 'Tooltip', route: '/components/tooltip' },
      ],
    },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
