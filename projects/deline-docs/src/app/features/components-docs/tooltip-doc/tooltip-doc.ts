import { Component, signal } from '@angular/core';
import { Tooltip } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-tooltip-doc',
  imports: [Tooltip, ApiTable, CodeBlock],
  templateUrl: './tooltip-doc.html',
})
export class TooltipDoc {
  showCode = signal(false);
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Tooltip } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  inputProps: ApiTableRow[] = [
    { name: 'text', type: 'string', default: '-', description: 'Texto del tooltip (requerido).' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posición del tooltip.' },
    { name: 'delay', type: 'number', default: '300', description: 'Milisegundos de retardo antes de mostrar.' },
  ];

  outputProps: ApiTableRow[] = [];
}
