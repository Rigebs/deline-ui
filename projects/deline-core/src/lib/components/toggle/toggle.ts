import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'dln-toggle',
  host: {
    '[class.is-checked]': 'checked()',
    '[class.is-disabled]': 'disabled()',
    '[attr.role]': `'switch'`,
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle()',
    '(keydown.enter)': 'toggle()',
  },
  templateUrl: './toggle.html',
  styleUrl: './toggle.css',
})
export class Toggle {
  checked = model<boolean>(false);
  label = input<string>('');
  disabled = input<boolean>(false);
  changed = output<boolean>();

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.update((v) => !v);
    this.changed.emit(this.checked());
  }
}
