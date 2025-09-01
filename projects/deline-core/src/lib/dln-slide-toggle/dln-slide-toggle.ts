import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dln-slide-toggle',
  templateUrl: './dln-slide-toggle.html',
  styleUrls: ['./dln-slide-toggle.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnSlideToggle),
      multi: true,
    },
  ],
})
export class DlnSlideToggle implements ControlValueAccessor {
  private innerValue: boolean = false;
  disabled = false;

  @Input() label: string = '';
  @Output() valueChange = new EventEmitter<boolean>();

  @Input()
  get value(): boolean {
    return this.innerValue;
  }
  set value(val: boolean) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.onChange(this.innerValue);
      this.valueChange.emit(this.innerValue);
    }
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.innerValue = !!value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    if (this.disabled) return;
    this.value = !this.value;
    this.onTouched();
  }
}
