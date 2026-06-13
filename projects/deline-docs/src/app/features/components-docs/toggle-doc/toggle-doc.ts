import { Component, signal, computed } from '@angular/core';
import { Toggle } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-doc',
  imports: [Toggle, ApiTable, CodeBlock, FormsModule],
  templateUrl: './toggle-doc.html',
})
export class ToggleDoc {
  showCode = signal(false);
  playChecked = signal(false);
  playDisabled = signal(false);

  plainChecked = signal(false);
  darkChecked = signal(true);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Toggle } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-toggle'];
    if (this.playChecked() || this.playDisabled()) {
      parts.push(`\n  [(checked)]="miValor"`);
    }
    if (this.playDisabled()) {
      parts.push(`\n  [disabled]="true"`);
    }
    parts.push(`\n  label="Activar notificaciones"`);
    parts.push(`\n></dln-toggle>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Estado activo del toggle (modelo bidireccional).' },
    { name: 'label', type: 'string', default: "''", description: 'Texto descriptivo mostrado junto al toggle.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'changed', type: 'boolean', default: '-', description: 'Emite el nuevo valor cuando cambia el estado.' },
  ];
}
