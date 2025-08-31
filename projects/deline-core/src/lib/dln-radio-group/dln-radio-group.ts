import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DlnRadioButton } from 'deline-core';

@Component({
  selector: 'dln-radio-group',
  templateUrl: './dln-radio-group.html',
  styleUrls: ['./dln-radio-group.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DlnRadioGroup),
      multi: true,
    },
  ],
})
export class DlnRadioGroup implements ControlValueAccessor, AfterContentInit {
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  @ContentChildren(forwardRef(() => DlnRadioButton)) radios!: QueryList<DlnRadioButton>;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterContentInit() {
    this.radios.forEach((radio) => {
      radio.registerGroup(this);
      radio.checked = radio.value === this.value;
    });
  }

  select(value: any) {
    this.value = value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();

    this.radios.forEach((radio) => (radio.checked = radio.value === value));
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.radios) {
      this.radios.forEach((r) => (r.checked = r.value === value));
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (this.radios) {
      this.radios.forEach((r) => (r.disabled = isDisabled));
    }
  }
}
