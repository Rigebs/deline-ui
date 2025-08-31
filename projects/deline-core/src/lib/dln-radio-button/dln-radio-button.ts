import { Component, Input } from '@angular/core';
import { DlnRadioGroup } from '../dln-radio-group/dln-radio-group';

@Component({
  selector: 'dln-radio-button',
  templateUrl: './dln-radio-button.html',
  styleUrls: ['./dln-radio-button.css'],
})
export class DlnRadioButton {
  @Input() value: any;
  @Input() disabled = false;
  checked = false;

  private group!: DlnRadioGroup;

  registerGroup(group: DlnRadioGroup) {
    this.group = group;
  }

  onChange() {
    if (!this.disabled && this.group) {
      this.group.select(this.value);
    }
  }
}
