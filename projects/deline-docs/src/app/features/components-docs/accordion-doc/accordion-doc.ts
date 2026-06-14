import { Component, signal } from '@angular/core';
import { Accordion, AccordionPanel } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-accordion-doc',
  imports: [Accordion, AccordionPanel, ApiTable, CodeBlock],
  templateUrl: './accordion-doc.html',
})
export class AccordionDoc {
  showCode = signal(false);
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Accordion, AccordionPanel } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  inputProps: ApiTableRow[] = [
    { name: 'multi (Accordion)', type: 'boolean', default: 'false', description: 'Permite múltiples paneles abiertos.' },
    { name: 'header (Panel)', type: 'string', default: '-', description: 'Texto del encabezado del panel (requerido).' },
    { name: 'expanded (Panel)', type: 'boolean', default: 'false', description: 'Estado expandido del panel.' },
    { name: 'disabled (Panel)', type: 'boolean', default: 'false', description: 'Deshabilita la interacción del panel.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'toggled (Panel)', type: 'boolean', default: '-', description: 'Emite el estado cuando se abre/cierra el panel.' },
  ];
}
