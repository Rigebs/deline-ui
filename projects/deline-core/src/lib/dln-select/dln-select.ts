import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dln-select',
  templateUrl: './dln-select.html',
  styleUrls: ['./dln-select.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnSelect),
      multi: true,
    },
  ],
})
export class DlnSelect implements ControlValueAccessor {
  @Input() placeholder: string = 'Select an option';

  @Input() options: string[] = [];

  private innerValue: string = '';
  disabled = false;

  @Input()
  get value(): string {
    return this.innerValue;
  }
  set value(val: string) {
    if (val !== this.innerValue) {
      this.innerValue = val ?? '';
      this.onChange(this.innerValue);
      this.valueChange.emit(this.innerValue);
    }
  }

  @Output() valueChange = new EventEmitter<string>();

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.innerValue = value ?? '';
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

  onChangeSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
  }

  onBlur() {
    this.onTouched();
  }
}
