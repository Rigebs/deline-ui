import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alert } from '../alert/alert';

@Component({
  selector: 'dln-form',
  imports: [CommonModule, ReactiveFormsModule, Alert],
  host: {
    '[class.is-submitted]': 'isSubmitted',
  },
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Enviar');
  cancelLabel = input<string>('Cancelar');
  showCancel = input<boolean>(false);
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  errorMessage = input<string>('');
  successMessage = input<string>('');
  formSubmit = output<void>();
  cancelled = output<void>();

  protected hasBeenSubmitted = false;

  protected get isSubmitted(): boolean {
    return this.hasBeenSubmitted;
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.hasBeenSubmitted = true;
    const group = this.formGroup();
    group.markAllAsTouched();
    if (group.valid) {
      this.formSubmit.emit();
    }
  }

  protected onCancel(): void {
    this.hasBeenSubmitted = false;
    this.cancelled.emit();
  }
}
