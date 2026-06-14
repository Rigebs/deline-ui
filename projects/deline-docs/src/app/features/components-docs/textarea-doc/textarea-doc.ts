import { Component, signal, computed } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { Textarea } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-textarea-doc',
  imports: [Textarea, ApiTable, CodeBlock, FormsModule],
  templateUrl: './textarea-doc.html',
})
export class TextareaDoc {
  showCode = signal(false);
  playControl = new FormControl('', Validators.required);
  playRows = signal(4);
  importCopied = signal(false);

  basicControl = new FormControl('');
  charControl = new FormControl('');
  errorControl = new FormControl('', Validators.required);
  disabledControl = new FormControl('Contenido bloqueado');
  readonlyControl = new FormControl('Texto legal de ejemplo...');

  copyImport() {
    navigator.clipboard.writeText(`import { Textarea } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    return `<dln-textarea
  label="Descripción"
  [control]="descripcionControl"
  placeholder="Escribe aquí..."
  [rows]="${this.playRows()}"
></dln-textarea>`;
  });

  inputProps: ApiTableRow[] = [
    { name: 'label', type: 'string', default: '-', description: 'Etiqueta del campo (requerido).' },
    { name: 'control', type: 'FormControl', default: '-', description: 'Control reactivo de Angular (requerido).' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto de placeholder.' },
    { name: 'rows', type: 'number', default: '4', description: 'Número de filas visibles.' },
    { name: 'maxLength', type: 'number', default: '0', description: 'Máximo de caracteres (0 = sin límite).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Modo solo lectura.' },
    { name: 'helperText', type: 'string', default: "''", description: 'Texto de ayuda debajo del campo.' },
    { name: 'customError', type: 'string', default: "''", description: 'Mensaje de error personalizado.' },
    { name: 'showCharCount', type: 'boolean', default: 'false', description: 'Muestra contador de caracteres (requiere maxLength).' },
  ];

  outputProps: ApiTableRow[] = [];
}
