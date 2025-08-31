import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dln-input',
  templateUrl: './dln-input.html',
  styleUrls: ['./dln-input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnInput),
      multi: true,
    },
  ],
})
export class DlnInput implements ControlValueAccessor {
  @Input() placeholder: string = 'Type here...';
  @Input() type: string = 'text';

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

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  handleBlur() {
    this.onTouched();
  }
}
