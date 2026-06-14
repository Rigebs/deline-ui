import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Form, TextField } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-form-doc',
  imports: [Form, TextField, ApiTable, CodeBlock, ReactiveFormsModule],
  templateUrl: './form-doc.html',
})
export class FormDoc {
  showCode = signal(false);
  importCopied = signal(false);
  submitCount = signal(0);

  playForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  simpleForm = new FormGroup({ campo: new FormControl('') });
  loadingForm = new FormGroup({ campo: new FormControl('') });
  errorForm = new FormGroup({ campo: new FormControl('') });
  successForm = new FormGroup({ campo: new FormControl('') });

  copyImport() {
    navigator.clipboard.writeText(`import { Form } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  onSubmit() {
    this.submitCount.update(v => v + 1);
  }

  inputProps: ApiTableRow[] = [
    { name: 'formGroup', type: 'FormGroup', default: '-', description: 'FormGroup de Angular (requerido).' },
    { name: 'submitLabel', type: 'string', default: "'Enviar'", description: 'Texto del botón submit.' },
    { name: 'cancelLabel', type: 'string', default: "'Cancelar'", description: 'Texto del botón cancelar.' },
    { name: 'showCancel', type: 'boolean', default: 'false', description: 'Muestra botón de cancelar.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Estado de carga con spinner.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el formulario.' },
    { name: 'errorMessage', type: 'string', default: "''", description: 'Mensaje de error global.' },
    { name: 'successMessage', type: 'string', default: "''", description: 'Mensaje de éxito global.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'formSubmit', type: 'void', default: '-', description: 'Se emite cuando el formulario es válido y se envía.' },
    { name: 'cancelled', type: 'void', default: '-', description: 'Se emite al cancelar.' },
  ];
}
