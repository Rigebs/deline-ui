import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ALL_COMPONENTS, CATEGORY_LABELS } from '../../data/components';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  router = inject(Router);
  open = input(false);
  navigated = output<void>();

  groups = [
    {
      title: 'Primeros Pasos',
      items: [
        { label: 'Introducción', route: '/' },
        { label: 'Instalación', route: '/installation', disabled: true },
      ],
    },
    ...Object.entries(
      ALL_COMPONENTS.reduce<Record<string, { label: string; route: string }[]>>((acc, c) => {
        const cat = CATEGORY_LABELS[c.category];
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push({ label: c.label, route: c.route });
        return acc;
      }, {}),
    ).map(([title, items]) => ({ title, items })),
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  onNavigate(): void {
    this.navigated.emit();
  }
}
