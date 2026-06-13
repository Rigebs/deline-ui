import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelect, SelectOption, SelectOptionGroup } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-multi-select-doc',
  imports: [CommonModule, FormsModule, MultiSelect, ApiTable, CodeBlock],
  templateUrl: './multi-select-doc.html',
  styleUrl: './multi-select-doc.css',
})
export class MultiSelectDoc {
  showCode = signal(false);
  playValue = signal<unknown[]>([]);
  playDisabled = signal(false);
  playRequired = signal(false);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { MultiSelect } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  sampleOptions: (SelectOption | SelectOptionGroup)[] = [
    { label: 'Frontend Developer', value: 'frontend' },
    { label: 'Backend Developer', value: 'backend' },
    { label: 'Full Stack Developer', value: 'fullstack' },
    { label: 'UI/UX Designer', value: 'designer' },
    { label: 'DevOps Engineer', value: 'devops' },
    { label: 'Data Scientist', value: 'data' },
    { label: 'Product Manager', value: 'pm' },
  ];

  groupedOptions: (SelectOption | SelectOptionGroup)[] = [
    {
      label: 'Desarrollo',
      options: [
        { label: 'Frontend Developer', value: 'frontend' },
        { label: 'Backend Developer', value: 'backend' },
        { label: 'Full Stack Developer', value: 'fullstack' },
      ],
    },
    {
      label: 'Diseño',
      options: [
        { label: 'UI/UX Designer', value: 'designer' },
        { label: 'Graphic Designer', value: 'graphic' },
      ],
    },
    {
      label: 'Operaciones',
      options: [
        { label: 'DevOps Engineer', value: 'devops' },
        { label: 'Data Scientist', value: 'data' },
        { label: 'Product Manager', value: 'pm' },
      ],
    },
  ];

  selectedCountValue = signal<unknown[]>(['frontend', 'designer']);

  genCode = computed(() => {
    const parts = ['<dln-multi-select'];
    parts.push(`\n  label="Roles"`);
    parts.push(`\n  [options]="roles"`);
    parts.push(`\n  [(value)]="selectedRoles"`);
    if (this.playDisabled()) {
      parts.push(`\n  [disabled]="true"`);
    }
    if (this.playRequired()) {
      parts.push(`\n  [required]="true"`);
    }
    parts.push(`\n></dln-multi-select>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'label', type: 'string', default: '—', description: 'Texto de la etiqueta mostrada sobre el multiselect (requerido).' },
    { name: 'options', type: 'SelectOption[] | SelectOptionGroup[]', default: '—', description: 'Lista de opciones o grupos de opciones (requerido).' },
    { name: 'value', type: 'unknown[]', default: '[]', description: 'Arreglo de valores seleccionados (modelo bidireccional).' },
    { name: 'placeholder', type: 'string', default: "'Selecciona opciones...'", description: 'Texto mostrado cuando no hay opciones seleccionadas.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción con el multiselect.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marca el campo como requerido para validación.' },
    { name: 'ariaLabel', type: 'string', default: "''", description: 'Atributo accesible aria-label.' },
    { name: 'ariaDescribedBy', type: 'string', default: "''", description: 'Atributo accesible aria-describedby.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'valueChange', type: 'unknown[]', default: '-', description: 'Emite el arreglo de valores cuando cambia la selección.' },
  ];
}
