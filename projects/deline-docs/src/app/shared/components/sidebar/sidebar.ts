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
        { label: 'Button', route: '/components/button' },
        { label: 'Card', route: '/components/card' },
        { label: 'Badge', route: '/components/badge' },
        { label: 'Toggle', route: '/components/toggle' },
        { label: 'Avatar', route: '/components/avatar' },
        { label: 'Toast', route: '/components/toast' },
        { label: 'Input', route: '/components/input' },
        { label: 'Select', route: '/components/select' },
        { label: 'Tabs', route: '/components/tabs' },
        { label: 'Empty State', route: '/components/empty-state' },
        { label: 'Skeleton', route: '/components/skeleton' },
        { label: 'Multi Select', route: '/components/multi-select' },
        { label: 'Modal', route: '/components/modal' },
      ],
    },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
