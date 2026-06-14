import { Component, signal, computed } from '@angular/core';
import { Checkbox } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-doc',
  imports: [Checkbox, ApiTable, CodeBlock, FormsModule],
  templateUrl: './checkbox-doc.html',
})
export class CheckboxDoc {
  showCode = signal(false);
  playChecked = signal(false);
  playDisabled = signal(false);
  playIndeterminate = signal(false);
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Checkbox } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-checkbox'];
    if (this.playChecked()) parts.push(`\n  [(checked)]="miValor"`);
    if (this.playDisabled()) parts.push(`\n  [disabled]="true"`);
    if (this.playIndeterminate()) parts.push(`\n  [(indeterminate)]="miValor"`);
    parts.push(`\n  label="Acepto términos"`);
    parts.push(`\n></dln-checkbox>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Estado del checkbox (modelo bidireccional).' },
    { name: 'label', type: 'string', default: "''", description: 'Texto mostrado junto al checkbox.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado indeterminado (modelo bidireccional). Al hacer clic se limpia automáticamente.' },
    { name: 'value', type: 'string', default: "''", description: 'Valor asociado al checkbox.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'changed', type: 'boolean', default: '-', description: 'Emite el nuevo valor cuando cambia.' },
  ];
}
