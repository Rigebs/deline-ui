import {
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  ChangeDetectorRef,
} from '@angular/core';
import { DLN_CONTROL } from '../../core/control';

@Component({
  selector: 'dln-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  host: {
    '[class.is-focused]': 'focused()',
    '[class.has-error]': 'hasError',
    '[class.is-disabled]': 'disabled()',
  },
})
export class FormField {
  private ctrl = contentChild(DLN_CONTROL);
  private cdRef = inject(ChangeDetectorRef);

  label = input('');
  helperText = input('');
  customError = input('');

  protected focused = computed(() => this.ctrl()?.focused() ?? false);
  protected disabled = computed(() => this.ctrl()?.disabled() ?? false);

  constructor() {
    effect((onCleanup) => {
      const c = this.ctrl();
      if (c) {
        const sub = c.stateChanges.subscribe(() => this.cdRef.markForCheck());
        onCleanup(() => sub.unsubscribe());
      }
    });
  }

  get hasError(): boolean {
    const c = this.ctrl();
    return c ? c.hasError : false;
  }

  get errorComputed(): string {
    const c = this.ctrl();
    if (!c) return '';
    const fctrl = c.formControl;
    if (fctrl && (fctrl.touched || fctrl.dirty) && fctrl.errors) {
      if (this.customError()) return this.customError();
      const errs = fctrl.errors;
      if (errs['required']) return 'Este campo es obligatorio';
      if (errs['email']) return 'Formato de correo inválido';
      if (errs['minlength']) return `Mínimo ${errs['minlength'].requiredLength} caracteres`;
      if (errs['maxlength']) return `Máximo ${errs['maxlength'].requiredLength} caracteres`;
      if (errs['pattern']) return 'Formato inválido';
      return 'Campo inválido';
    }
    return '';
  }

  protected errorId = computed(() => {
    const base = this.label().toLowerCase().replace(/\s+/g, '-');
    return `${base}-error`;
  });

  protected helperId = computed(() => {
    const base = this.label().toLowerCase().replace(/\s+/g, '-');
    return `${base}-helper`;
  });

  protected controlId = computed(() => {
    const c = this.ctrl();
    return c ? c.id : '';
  });
}
