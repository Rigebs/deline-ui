import { Component, input, signal, computed, contentChild, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dln-text-field',
  imports: [ReactiveFormsModule, CommonModule],
  host: {
    '[class.is-focused]': 'isFocused()',
    '[class.has-error]': 'hasError',
    '[class.is-multiline]': 'multiline()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-readonly]': 'readonly()',
    '[class.has-prefix]': 'hasPrefix()',
    '[class.has-suffix]': 'hasSuffix()',
  },
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField {
  label = input.required<string>();
  control = input.required<FormControl>();
  placeholder = input<string>('');
  type = input<string>('text');
  multiline = input<boolean>(false);
  customError = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  helperText = input<string>('');
  ariaDescribedBy = input<string>('');

  prefixTemplate = contentChild<TemplateRef<any>>('prefix');
  suffixTemplate = contentChild<TemplateRef<any>>('suffix');

  hasPrefix = computed(() => !!this.prefixTemplate());
  hasSuffix = computed(() => !!this.suffixTemplate());

  protected isFocused = signal(false);

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
    if (errors['email']) return 'Formato de correo inválido';
    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
    if (errors['maxlength']) {
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    }
    if (errors['pattern']) return 'Formato inválido';
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
