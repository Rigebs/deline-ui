import { Component, signal, computed } from '@angular/core';
import { Select, SelectOption, SelectOptionGroup } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-doc',
  imports: [Select, ApiTable, CodeBlock, FormsModule],
  templateUrl: './select-doc.html',
  styleUrl: './select-doc.css',
})
export class SelectDoc {
  showCode = signal(false);
  playValue = signal<string | null>(null);
  playDisabled = signal(false);
  playRequired = signal(false);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Select } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  sampleOptions: (SelectOption | SelectOptionGroup)[] = [
    { label: 'México', value: 'MX' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Chile', value: 'CL' },
    { label: 'Perú', value: 'PE' },
    { label: 'Brazil', value: 'BR' },
    { label: 'Uruguay', value: 'UY' },
  ];

  groupedOptions: (SelectOption | SelectOptionGroup)[] = [
    {
      label: 'América del Norte',
      options: [
        { label: 'México', value: 'MX' },
        { label: 'Estados Unidos', value: 'US' },
        { label: 'Canadá', value: 'CA' },
      ],
    },
    {
      label: 'América del Sur',
      options: [
        { label: 'Argentina', value: 'AR' },
        { label: 'Colombia', value: 'CO' },
        { label: 'Chile', value: 'CL' },
        { label: 'Perú', value: 'PE' },
        { label: 'Brazil', value: 'BR' },
        { label: 'Uruguay', value: 'UY' },
      ],
    },
  ];

  genCode = computed(() => {
    const parts = ['<dln-select'];
    parts.push(`\n  label="País"`);
    parts.push(`\n  [options]="paises"`);
    parts.push(`\n  [(value)]="paisSeleccionado"`);
    if (this.playDisabled()) {
      parts.push(`\n  [disabled]="true"`);
    }
    if (this.playRequired()) {
      parts.push(`\n  [required]="true"`);
    }
    parts.push(`\n></dln-select>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'label', type: 'string', default: '—', description: 'Texto de la etiqueta mostrada sobre el select (requerido).' },
    { name: 'options', type: 'SelectOption[] | SelectOptionGroup[]', default: '—', description: 'Lista de opciones o grupos de opciones (requerido).' },
    { name: 'value', type: 'unknown', default: 'null', description: 'Valor seleccionado (modelo bidireccional).' },
    { name: 'placeholder', type: 'string', default: "'Selecciona una opción'", description: 'Texto mostrado cuando no hay opción seleccionada.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción con el select.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marca el campo como requerido para validación.' },
    { name: 'ariaLabel', type: 'string', default: "''", description: 'Atributo accesible aria-label.' },
    { name: 'ariaDescribedBy', type: 'string', default: "''", description: 'Atributo accesible aria-describedby.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'valueChange', type: 'unknown', default: '-', description: 'Emite el nuevo valor cuando se selecciona una opción.' },
  ];
}
