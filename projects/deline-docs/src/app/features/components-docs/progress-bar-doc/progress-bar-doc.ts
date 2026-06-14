import { Component, signal, computed } from '@angular/core';
import { ProgressBar } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-progress-bar-doc',
  imports: [ProgressBar, ApiTable, CodeBlock],
  templateUrl: './progress-bar-doc.html',
})
export class ProgressBarDoc {
  showCode = signal(false);
  playValue = signal(65);
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { ProgressBar } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    return `<dln-progress-bar
  [value]="${this.playValue()}"
  label="Progreso"
  [showValue]="true"
></dln-progress-bar>`;
  });

  inputProps: ApiTableRow[] = [
    { name: 'value', type: 'number', default: '0', description: 'Valor actual del progreso.' },
    { name: 'max', type: 'number', default: '100', description: 'Valor máximo.' },
    { name: 'min', type: 'number', default: '0', description: 'Valor mínimo.' },
    { name: 'label', type: 'string', default: "''", description: 'Etiqueta mostrada arriba de la barra.' },
    { name: 'variant', type: "'primary' | 'success' | 'warning' | 'error'", default: "'primary'", description: 'Color de la barra.' },
    { name: 'showValue', type: 'boolean', default: 'false', description: 'Muestra el porcentaje numérico.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Modo indeterminado (animación).' },
  ];

  outputProps: ApiTableRow[] = [];
}
