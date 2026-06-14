import { Component, signal, computed } from '@angular/core';
import { DatePicker } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-date-picker-doc',
  imports: [DatePicker, ApiTable, CodeBlock],
  templateUrl: './date-picker-doc.html',
})
export class DatePickerDoc {
  showCode = signal(false);
  playDate = signal('');
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { DatePicker } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-date-picker'];
    if (this.playDate()) parts.push(`\n  [(value)]="miFecha"`);
    parts.push(`\n  label="Fecha de inicio"`);
    parts.push(`\n></dln-date-picker>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'value', type: 'string', default: "''", description: 'Fecha seleccionada en formato ISO (YYYY-MM-DD).' },
    { name: 'label', type: 'string', default: "''", description: 'Etiqueta del campo.' },
    { name: 'placeholder', type: 'string', default: "'Seleccionar fecha'", description: 'Texto cuando no hay fecha.' },
    { name: 'min', type: 'string', default: "''", description: 'Fecha mínima seleccionable.' },
    { name: 'max', type: 'string', default: "''", description: 'Fecha máxima seleccionable.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'changed', type: 'string', default: '-', description: 'Emite la fecha cuando cambia.' },
  ];
}
