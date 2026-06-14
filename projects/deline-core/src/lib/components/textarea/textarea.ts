import { Component, input, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dln-textarea',
  imports: [ReactiveFormsModule, CommonModule],
  host: {
    '[class.is-focused]': 'isFocused()',
    '[class.has-error]': 'hasError',
    '[class.is-disabled]': 'disabled()',
    '[class.is-readonly]': 'readonly()',
  },
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
})
export class Textarea {
  label = input.required<string>();
  control = input.required<FormControl>();
  placeholder = input<string>('');
  rows = input<number>(4);
  maxLength = input<number>(0);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  helperText = input<string>('');
  customError = input<string>('');
  showCharCount = input<boolean>(false);
  ariaDescribedBy = input<string>('');

  protected isFocused = signal(false);
  protected charCount = computed(() => this.control()?.value?.length ?? 0);

  protected get hasError(): boolean {
    const ctrl = this.control();
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  protected get errorComputed(): string {
    const ctrl = this.control();
    if (!ctrl.touched && !ctrl.dirty) return '';
    if (!ctrl.errors) return '';
    if (this.customError()) return this.customError();

    const errors = ctrl.errors;
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }

  protected get showHelperOrError(): string {
    if (this.hasError) return this.errorComputed;
    return this.helperText();
  }

  protected describedByIds = computed((): string | undefined => {
    const ids: string[] = [];
    const baseId = this.label().toLowerCase().replace(/\s+/g, '-');
    if (this.hasError) ids.push(`${baseId}-error`);
    if (this.helperText() && !this.hasError) ids.push(`${baseId}-helper`);
    if (this.ariaDescribedBy()) ids.push(this.ariaDescribedBy());
    return ids.length > 0 ? ids.join(' ') : undefined;
  });

  protected errorId = computed(() => `${this.label().toLowerCase().replace(/\s+/g, '-')}-error`);
  protected helperId = computed(() => `${this.label().toLowerCase().replace(/\s+/g, '-')}-helper`);

  protected onFocus(): void {
    if (!this.disabled() && !this.readonly()) {
      this.isFocused.set(true);
    }
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.control().markAsTouched();
  }
}
