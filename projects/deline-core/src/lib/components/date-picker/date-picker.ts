import { Component, input, output, model, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-date-picker',
  imports: [CommonModule, IconComponent],
  host: {
    '[class.is-open]': 'isOpen()',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {
  value = model<string>('');
  label = input<string>('');
  placeholder = input<string>('Seleccionar fecha');
  min = input<string>('');
  max = input<string>('');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('');
  changed = output<string>();

  protected isOpen = signal(false);

  protected displayValue = computed(() => {
    const v = this.value();
    if (!v) return '';
    const d = new Date(v + 'T12:00:00');
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  protected onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }

  protected toggleCalendar(): void {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
  }

  protected closeCalendar(): void {
    this.isOpen.set(false);
  }
}
