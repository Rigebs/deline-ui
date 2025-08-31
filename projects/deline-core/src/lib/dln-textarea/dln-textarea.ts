import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dln-textarea',
  templateUrl: './dln-textarea.html',
  styleUrls: ['./dln-textarea.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnTextarea),
      multi: true,
    },
  ],
})
export class DlnTextarea implements ControlValueAccessor {
  @Input() placeholder: string = '';

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

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  onBlur() {
    this.onTouched();
  }
}
