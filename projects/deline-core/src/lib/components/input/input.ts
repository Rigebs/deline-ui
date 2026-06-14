import { Component, input, signal, computed, contentChild, TemplateRef, inject, forwardRef, effect } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DlnControl, DLN_CONTROL } from '../../core/control';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'dln-input',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [{ provide: DLN_CONTROL, useExisting: forwardRef(() => Input) }],
  host: {
    '[class.is-focused]': 'focused()',
    '[class.has-error]': 'hasError',
    '[class.is-disabled]': 'disabled()',
    '[class.is-readonly]': 'readonly()',
    '[class.has-prefix]': 'hasPrefix()',
    '[class.has-suffix]': 'hasSuffix()',
  },
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input implements DlnControl {
  private parentFormField = inject(FormField, { optional: true, skipSelf: true });

  label = input<string>('');
  control = input.required<FormControl>();
  placeholder = input<string>('');
  type = input<string>('text');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  helperText = input<string>('');
  customError = input<string>('');
  ariaDescribedBy = input<string>('');

  prefixTemplate = contentChild<TemplateRef<any>>('prefix');
  suffixTemplate = contentChild<TemplateRef<any>>('suffix');

  hasPrefix = computed(() => !!this.prefixTemplate());
  hasSuffix = computed(() => !!this.suffixTemplate());

  protected isFocused = signal(false);

  readonly focused = this.isFocused.asReadonly();
  readonly id = `dln-input-${Math.random().toString(36).slice(2, 9)}`;

  private _stateChanges = new Subject<void>();
  readonly stateChanges = this._stateChanges.asObservable();

  get hasError(): boolean {
    const ctrl = this.control();
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  get formControl(): FormControl {
    return this.control();
  }

  protected hasParentFormField = computed(() => !!this.parentFormField);

  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();
      const sub = ctrl.statusChanges.subscribe(() => this._stateChanges.next());
      const sub2 = ctrl.valueChanges.subscribe(() => this._stateChanges.next());
      onCleanup(() => {
        sub.unsubscribe();
        sub2.unsubscribe();
      });
    });
  }

  protected errorComputed = computed((): string => {
    const ctrl = this.control();
    if (!ctrl.touched && !ctrl.dirty) return '';
    if (!ctrl.errors) return '';

    if (this.customError()) return this.customError();

    const errors = ctrl.errors;
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Formato de correo inválido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return 'Formato inválido';
    return 'Campo inválido';
  });

  protected showHelperOrError = computed((): string => {
    if (this.hasError) return this.errorComputed();
    return this.helperText();
  });

  protected describedByIds = computed((): string | undefined => {
    if (this.hasParentFormField()) return undefined;
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
    this._stateChanges.next();
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.control().markAsTouched();
    this._stateChanges.next();
  }
}
