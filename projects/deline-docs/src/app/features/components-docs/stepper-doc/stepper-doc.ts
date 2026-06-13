import { Component, signal, computed } from '@angular/core';
import { Stepper } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stepper-doc',
  imports: [CommonModule, FormsModule, Stepper, ApiTable, CodeBlock],
  templateUrl: './stepper-doc.html',
  styleUrl: './stepper-doc.css',
})
export class StepperDoc {
  showCode = signal(false);
  playSteps = signal(['Información', 'Pago', 'Confirmación']);
  playStep = signal(0);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Stepper } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const steps = this.playSteps().map(s => `'${s}'`).join(', ');
    return `<dln-stepper\n  [steps]="[${steps}]"\n  [currentStep]="${this.playStep()}">\n</dln-stepper>`;
  });

  prevStep() {
    this.playStep.update(v => Math.max(0, v - 1));
  }

  nextStep() {
    this.playStep.update(v => Math.min(this.playSteps().length - 1, v + 1));
  }

  variantCode3step0 = `<dln-stepper
  [steps]="['Informaci\u00f3n', 'Pago', 'Confirmaci\u00f3n']"
  [currentStep]="0">
</dln-stepper>`;

  variantCode3step1 = `<dln-stepper
  [steps]="['Informaci\u00f3n', 'Pago', 'Confirmaci\u00f3n']"
  [currentStep]="1">
</dln-stepper>`;

  variantCode3step2 = `<dln-stepper
  [steps]="['Informaci\u00f3n', 'Pago', 'Confirmaci\u00f3n']"
  [currentStep]="2">
</dln-stepper>`;

  variantCode5step2 = `<dln-stepper
  [steps]="['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5']"
  [currentStep]="2">
</dln-stepper>`;

  variantCode5step3 = `<dln-stepper
  [steps]="['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5']"
  [currentStep]="3">
</dln-stepper>`;

  usecaseCheckout = `<dln-stepper
  [steps]="['Carrito', 'Envío', 'Pago', 'Confirmación']"
  [currentStep]="checkoutStep">
</dln-stepper>`;

  usecaseForm = `<dln-stepper
  [steps]="['Datos personales', 'Dirección', 'Preferencias', 'Resumen']"
  [currentStep]="formStep">
</dln-stepper>`;

  inputProps: ApiTableRow[] = [
    { name: 'steps', type: 'string[]', default: '—', description: 'Lista de etiquetas para cada paso del stepper.' },
    { name: 'currentStep', type: 'number', default: '0', description: 'Índice del paso activo (base 0).' },
  ];

  outputProps: ApiTableRow[] = [
    { name: '(none)', type: '-', default: '-', description: 'El stepper no emite eventos de salida.' },
  ];
}
