import { Directive, ElementRef, inject, signal, computed, OnInit, OnDestroy, DestroyRef } from '@angular/core';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { DlnControl, DLN_CONTROL } from '../../core/control';

@Directive({
  selector: 'input[dlnInput], textarea[dlnInput]',
  providers: [{ provide: DLN_CONTROL, useExisting: DlnInput }],
})
export class DlnInput implements DlnControl, OnInit, OnDestroy {
  private elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);
  private ngControl = inject(NgControl, { optional: true, self: true });
  private ngModel = inject(NgModel, { optional: true, self: true });

  protected isFocused = signal(false);

  readonly focused = this.isFocused.asReadonly();
  readonly disabled = computed(() => {
    const fc = this.formControl;
    return fc ? fc.disabled : this.elementRef.nativeElement.disabled;
  });
  readonly id = this.elementRef.nativeElement.id || `dln-input-${Math.random().toString(36).slice(2, 9)}`;

  private _stateChanges = new Subject<void>();
  readonly stateChanges = this._stateChanges.asObservable();

  get hasError(): boolean {
    const ctrl = this.formControl;
    return ctrl ? (ctrl.invalid && (ctrl.touched || ctrl.dirty)) : false;
  }

  get formControl(): FormControl | null {
    if (this.ngControl) return this.ngControl.control as FormControl;
    if (this.ngModel) return this.ngModel.control as FormControl;
    return null;
  }

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;
    el.addEventListener('focus', this._onFocus);
    el.addEventListener('blur', this._onBlur);
    this.destroyRef.onDestroy(() => {
      el.removeEventListener('focus', this._onFocus);
      el.removeEventListener('blur', this._onBlur);
    });

    const fc = this.formControl;
    if (fc) {
      const sub = fc.statusChanges.subscribe(() => this._stateChanges.next());
      const sub2 = fc.valueChanges.subscribe(() => this._stateChanges.next());
      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
        sub2.unsubscribe();
      });
    }
  }

  ngOnDestroy(): void {
  }

  private _onFocus = (): void => {
    this.isFocused.set(true);
    this._stateChanges.next();
  };

  private _onBlur = (): void => {
    this.isFocused.set(false);
    this.formControl?.markAsTouched();
    this._stateChanges.next();
  };
}
