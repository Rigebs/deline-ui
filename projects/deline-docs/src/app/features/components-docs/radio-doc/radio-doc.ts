import { Component, signal, computed } from '@angular/core';
import { Radio, RadioGroupComponent } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-radio-doc',
  imports: [Radio, RadioGroupComponent, ApiTable, CodeBlock],
  templateUrl: './radio-doc.html',
})
export class RadioDoc {
  showCode = signal(false);
  playValue = signal('opcion1');
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Radio, RadioGroupComponent } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    return `<dln-radio-group [value]="seleccion()" (changed)="seleccion.set($event)">
  <dln-radio value="opcion1" label="Opción 1"></dln-radio>
  <dln-radio value="opcion2" label="Opción 2"></dln-radio>
  <dln-radio value="opcion3" label="Opción 3"></dln-radio>
</dln-radio-group>`;
  });

  inputProps: ApiTableRow[] = [
    { name: 'value (RadioGroup)', type: 'string', default: "''", description: 'Valor seleccionado (modelo bidireccional).' },
    { name: 'name (RadioGroup)', type: 'string', default: "''", description: 'Nombre del grupo para agrupar radios.' },
    { name: 'disabled (RadioGroup)', type: 'boolean', default: 'false', description: 'Deshabilita todos los radios del grupo.' },
    { name: 'value (Radio)', type: 'string', default: '-', description: 'Valor único de esta opción (requerido).' },
    { name: 'label (Radio)', type: 'string', default: "''", description: 'Texto mostrado junto al radio.' },
    { name: 'disabled (Radio)', type: 'boolean', default: 'false', description: 'Deshabilita solo este radio.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'changed (RadioGroup)', type: 'string', default: '-', description: 'Emite el valor cuando cambia la selección.' },
  ];
}
