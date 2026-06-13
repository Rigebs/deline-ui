import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tabs } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-tabs-doc',
  imports: [CommonModule, FormsModule, Tabs, ApiTable, CodeBlock],
  templateUrl: './tabs-doc.html',
})
export class TabsDoc {
  showCode = signal(false);
  playLabels = signal(['Primero', 'Segundo', 'Tercero']);
  playActiveIndex = signal(0);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Tabs } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  updateLabels(value: string) {
    this.playLabels.set(value.split(',').map(s => s.trim()));
  }

  setActiveIndex(value: string) {
    this.playActiveIndex.set(Number(value));
  }

  genCode = computed(() => {
    const labels = this.playLabels().map(l => `'${l}'`).join(', ');
    return `<dln-tabs\n  [labels]="[${labels}]"\n  [(activeIndex)]="activeTab"\n></dln-tabs>`;
  });

  inputProps: ApiTableRow[] = [
    { name: 'labels', type: 'string[]', default: '—', description: 'Arreglo de etiquetas para cada tab (requerido).' },
    { name: 'activeIndex', type: 'number', default: '0', description: 'Índice del tab activo (modelo bidireccional).' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'tabChange', type: 'number', default: '-', description: 'Emite el índice del tab seleccionado.' },
  ];
}
