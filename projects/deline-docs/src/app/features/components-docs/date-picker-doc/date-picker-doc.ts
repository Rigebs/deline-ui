import { Component, signal, computed } from '@angular/core';
import { DatePicker, DateRangePicker, DateRange } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-date-picker-doc',
  imports: [DatePicker, DateRangePicker, ApiTable, CodeBlock],
  templateUrl: './date-picker-doc.html',
})
export class DatePickerDoc {
  showCode = signal(false);
  playDate = signal('');
  playRange = signal<DateRange>({ start: '', end: '' });
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { DatePicker, DateRangePicker } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts: string[] = [];

    parts.push('<!-- DatePicker simple -->');
    parts.push('<dln-date-picker');
    if (this.playDate()) parts.push(`  [(value)]="miFecha"`);
    parts.push(`  label="Fecha de inicio"`);
    parts.push('></dln-date-picker>');
    parts.push('');
    parts.push('<!-- DateRangePicker -->');
    parts.push('<dln-date-range-picker');
    if (this.playRange().start || this.playRange().end) parts.push(`  [(value)]="miRango"`);
    parts.push(`  label="Período"`);
    parts.push('></dln-date-range-picker>');

    return parts.join('\n');
  });

  datePickerInputs: ApiTableRow[] = [
    { name: 'value', type: 'string', default: "''", description: 'Fecha seleccionada en formato ISO (YYYY-MM-DD).' },
    { name: 'label', type: 'string', default: "''", description: 'Etiqueta del campo.' },
    { name: 'placeholder', type: 'string', default: "'Seleccionar fecha'", description: 'Texto cuando no hay fecha.' },
    { name: 'min', type: 'string', default: "''", description: 'Fecha mínima seleccionable (YYYY-MM-DD).' },
    { name: 'max', type: 'string', default: "''", description: 'Fecha máxima seleccionable (YYYY-MM-DD).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo.' },
  ];

  dateRangePickerInputs: ApiTableRow[] = [
    { name: 'value', type: 'DateRange', default: '{ start: "", end: "" }', description: 'Objeto con start y end en formato ISO (YYYY-MM-DD).' },
    { name: 'label', type: 'string', default: "''", description: 'Etiqueta del campo.' },
    { name: 'placeholder', type: 'string', default: "'Seleccionar rango'", description: 'Texto cuando no hay rango.' },
    { name: 'min', type: 'string', default: "''", description: 'Fecha mínima seleccionable (YYYY-MM-DD).' },
    { name: 'max', type: 'string', default: "''", description: 'Fecha máxima seleccionable (YYYY-MM-DD).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo.' },
  ];
}
