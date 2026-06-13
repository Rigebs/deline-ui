import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'dln-sidebar',
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = signal(false);
  activeRoute = signal('/dashboard');

  menuItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Usuarios', icon: 'users', route: '/users' },
    { label: 'Reportes', icon: 'reports', route: '/reports' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },
  ];

  navigate = output<string>();

  toggleSidebar() {
    this.isCollapsed.update((v) => !v);
  }

  handleNavigation(route: string) {
    this.activeRoute.set(route);
    this.navigate.emit(route);
  }
}
