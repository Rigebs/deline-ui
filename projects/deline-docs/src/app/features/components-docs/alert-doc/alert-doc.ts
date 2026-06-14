import { Component, signal, computed } from '@angular/core';
import { Alert } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-alert-doc',
  imports: [Alert, ApiTable, CodeBlock],
  templateUrl: './alert-doc.html',
})
export class AlertDoc {
  showCode = signal(false);
  dismissCount = signal(0);
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Alert } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  formErrorCode = computed(() => `@if (formError()) {
  <dln-alert variant="error">
    {{ formError() }}
  </dln-alert>
}`);

  onDismissed() {
    this.dismissCount.update(v => v + 1);
  }

  inputProps: ApiTableRow[] = [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Variante visual de la alerta.' },
    { name: 'dismissible', type: 'boolean', default: 'false', description: 'Muestra botón de cierre.' },
    { name: 'showIcon', type: 'boolean', default: 'true', description: 'Muestra el ícono de la variante.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'dismissed', type: 'void', default: '-', description: 'Se emite cuando se cierra la alerta.' },
  ];
}
