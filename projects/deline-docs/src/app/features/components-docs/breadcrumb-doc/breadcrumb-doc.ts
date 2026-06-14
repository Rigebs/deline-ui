import { Component, signal } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-breadcrumb-doc',
  imports: [Breadcrumb, ApiTable, CodeBlock],
  templateUrl: './breadcrumb-doc.html',
})
export class BreadcrumbDoc {
  showCode = signal(false);
  lastRoute = signal('');
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Breadcrumb } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  pages: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Productos', route: '/productos' },
    { label: 'Zapatos' },
  ];

  onNavigate(item: BreadcrumbItem) {
    this.lastRoute.set(item.label);
  }

  inputProps: ApiTableRow[] = [
    { name: 'items', type: 'BreadcrumbItem[]', default: '-', description: 'Lista de ítems del breadcrumb (requerido).' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'navigate', type: 'BreadcrumbItem', default: '-', description: 'Emite el ítem al hacer clic en un link.' },
  ];
}
