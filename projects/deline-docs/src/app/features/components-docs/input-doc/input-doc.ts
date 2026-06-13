import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TextField, Button } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-input-doc',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextField, Button, ApiTable, CodeBlock],
  templateUrl: './input-doc.html',
})
export class InputDoc {
  showCode = signal(false);
  importCopied = signal(false);

  playLabel = signal('Correo electrónico');
  playPlaceholder = signal('ej: usuario@correo.com');
  playDisabled = signal(false);
  playReadonly = signal(false);
  playMultiline = signal(false);
  playHelper = signal('Nunca compartiremos tu correo');

  playControl = new FormControl('', [Validators.required, Validators.email]);
  errorControl = new FormControl('', [Validators.required]);
  touchedControl = new FormControl('', [Validators.required]);
  disabledControl = new FormControl({ value: 'Valor deshabilitado', disabled: true });
  readonlyControl = new FormControl('Valor de solo lectura');
  prefilledControl = new FormControl('usuario@ejemplo.com');

  toggleError() {
    this.errorControl.markAsTouched();
    this.errorControl.setValue('');
  }

  markTouched() {
    this.touchedControl.markAsTouched();
    this.touchedControl.setValue('');
  }

  copyImport() {
    navigator.clipboard.writeText(`import { TextField } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts: string[] = [];
    parts.push(`<dln-text-field`);
    parts.push(`  label="${this.playLabel()}"`);
    parts.push(`  [control]="control"`);
    if (this.playPlaceholder()) parts.push(`  placeholder="${this.playPlaceholder()}"`);
    if (this.playMultiline()) parts.push(`  [multiline]="true"`);
    if (this.playDisabled()) parts.push(`  [disabled]="true"`);
    if (this.playReadonly()) parts.push(`  [readonly]="true"`);
    if (this.playHelper()) parts.push(`  helperText="${this.playHelper()}"`);
    parts.push(`></dln-text-field>`);
    return parts.join('\n');
  });

  apiRows: ApiTableRow[] = [
    { name: 'label', type: 'string', default: '— (requerido)', description: 'Etiqueta del campo, se muestra arriba del input.' },
    { name: 'control', type: 'FormControl', default: '— (requerido)', description: 'Control reactivo de Angular Forms.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto de placeholder dentro del input.' },
    { name: 'type', type: 'string', default: "'text'", description: 'Tipo de input HTML (text, email, password, etc.).' },
    { name: 'multiline', type: 'boolean', default: 'false', description: 'Convierte el input en un textarea multilínea.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción del campo.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Pone el campo en modo solo lectura.' },
    { name: 'helperText', type: 'string', default: "''", description: 'Texto de ayuda debajo del campo.' },
    { name: 'customError', type: 'string', default: "''", description: 'Mensaje de error personalizado.' },
    { name: 'ariaDescribedBy', type: 'string', default: "''", description: 'ID para aria-describedby personalizado.' },
  ];
}
