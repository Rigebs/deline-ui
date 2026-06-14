import { Component, input, output, signal, inject, WritableSignal } from '@angular/core';

export class RadioGroup {
  value: WritableSignal<string> = signal('');
  name = '';
  disabled = false;
  changed: ((value: string) => void) | null = null;
}

@Component({
  selector: 'dln-radio',
  host: {
    '[class.is-checked]': 'isChecked()',
    '[class.is-disabled]': 'isDisabled()',
    '[attr.role]': `'radio'`,
    '[attr.aria-checked]': 'isChecked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.tabindex]': 'isDisabled() ? -1 : (isChecked() ? 0 : -1)',
    '(click)': 'select()',
    '(keydown.space)': 'select(); $event.preventDefault()',
    '(keydown.enter)': 'select(); $event.preventDefault()',
  },
  templateUrl: './radio.html',
  styleUrl: './radio.css',
})
export class Radio {
  value = input.required<string>();
  label = input<string>('');
  disabled = input<boolean>(false);

  private group = inject(RadioGroup, { optional: true, skipSelf: true });

  protected isChecked(): boolean {
    return this.group ? this.group.value() === this.value() : false;
  }

  protected isDisabled(): boolean {
    if (this.disabled()) return true;
    if (this.group?.disabled) return true;
    return false;
  }

  protected select(): void {
    if (this.isDisabled()) return;
    if (this.group) {
      this.group.value.set(this.value());
      this.group.changed?.(this.value());
    }
  }
}

@Component({
  selector: 'dln-radio-group',
  providers: [RadioGroup],
  host: {
    '[attr.role]': `'radiogroup'`,
    '[attr.aria-disabled]': 'disabled()',
  },
  template: `<div class="radio-group-wrapper"><ng-content></ng-content></div>`,
  styles: [`
    .radio-group-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
  `],
})
export class RadioGroupComponent {
  value = input<string>('');
  name = input<string>('');
  disabled = input<boolean>(false);
  changed = output<string>();

  private group = inject(RadioGroup);

  constructor() {
    const val = this.value;
    const grp = this.group;
    const chg = this.changed;
    grp.value.set(val());
    grp.name = this.name();
    grp.disabled = this.disabled();
    grp.changed = (v: string) => chg.emit(v);
  }
}
