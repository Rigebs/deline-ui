import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dln-checkbox',
  templateUrl: './dln-checkbox.html',
  styleUrls: ['./dln-checkbox.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnCheckbox),
      multi: true,
    },
  ],
})
export class DlnCheckbox implements ControlValueAccessor {
  @Input() label: string = '';

  private innerValue: boolean = false;
  disabled = false;

  @Input()
  get checked(): boolean {
    return this.innerValue;
  }
  set checked(val: boolean) {
    if (val !== this.innerValue) {
      this.innerValue = val ?? false;
      this.onChange(this.innerValue);
      this.checkedChange.emit(this.innerValue);
    }
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.innerValue = value ?? false;
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

  toggle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
  }

  onBlur() {
    this.onTouched();
  }
}
