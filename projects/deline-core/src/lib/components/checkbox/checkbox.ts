import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'dln-checkbox',
  host: {
    '[class.is-checked]': 'checked()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-indeterminate]': 'indeterminate()',
    '[attr.role]': `'checkbox'`,
    '[attr.aria-checked]': 'indeterminate() ? \'mixed\' : checked()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
  },
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  checked = model<boolean>(false);
  label = input<string>('');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);
  value = input<string>('');
  changed = output<boolean>();

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.update((v) => !v);
    this.changed.emit(this.checked());
  }
}
