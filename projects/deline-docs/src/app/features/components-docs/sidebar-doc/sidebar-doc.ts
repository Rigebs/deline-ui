import { Component, signal, computed, viewChild, afterNextRender } from '@angular/core';
import { Sidebar } from 'deline-core';
import { CommonModule } from '@angular/common';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-sidebar-doc',
  imports: [CommonModule, Sidebar, ApiTable, CodeBlock],
  templateUrl: './sidebar-doc.html',
})
export class SidebarDoc {
  showCode = signal(false);
  importCopied = signal(false);
  lastRoute = signal('');

  sidebarRef = viewChild<Sidebar>('playSidebar');
  collapsedSidebarRef = viewChild<Sidebar>('collapsedSidebar');

  genCode = computed(() => {
    return `<dln-sidebar (navigate)="onNavigate($event)"></dln-sidebar>`;
  });

  constructor() {
    afterNextRender(() => {
      this.collapsedSidebarRef()?.toggleSidebar();
    });
  }

  copyImport() {
    navigator.clipboard.writeText(`import { Sidebar } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  onNavigate(route: string) {
    this.lastRoute.set(route);
  }

  toggleCollapsed() {
    this.sidebarRef()?.toggleSidebar();
  }

  outputProps: ApiTableRow[] = [
    { name: 'navigate', type: 'string', default: '-', description: 'Emite la ruta seleccionada al hacer clic en un elemento del menú.' },
  ];
}
