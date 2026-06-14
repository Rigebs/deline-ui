import { Component, input, model, signal, computed, inject, ElementRef, effect, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { IconComponent } from 'deline-icons';
import { DlnControl, DLN_CONTROL } from '../../core/control';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'dln-date-picker',
  imports: [CommonModule, IconComponent],
  providers: [{ provide: DLN_CONTROL, useExisting: forwardRef(() => DatePicker) }],
  host: {
    '[class.is-open]': 'isOpen()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-focused]': 'isFocused()',
    '(document:click)': 'onClickOutside($event)',
    '(keydown)': 'onKeyDown($event)',
  },
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker implements DlnControl {
  private elementRef = inject(ElementRef);
  private parentFormField = inject(FormField, { optional: true, skipSelf: true });

  value = model<string>('');
  label = input<string>('');
  placeholder = input<string>('Seleccionar fecha');
  min = input<string>('');
  max = input<string>('');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('');

  isOpen = signal(false);
  currentMonth = signal(0);
  currentYear = signal(0);
  protected isFocused = signal(false);

  readonly focused = this.isFocused.asReadonly();
  readonly id = `dln-date-picker-${Math.random().toString(36).slice(2, 9)}`;

  private _stateChanges = new Subject<void>();
  readonly stateChanges = this._stateChanges.asObservable();

  get hasError(): boolean {
    return false;
  }

  get formControl(): FormControl | null {
    return null;
  }

  protected hasParentFormField = computed(() => !!this.parentFormField);

  protected dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  protected monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  protected displayValue = computed(() => {
    const v = this.value();
    if (!v) return '';
    const [y, m, d] = v.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  protected calendarGrid = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const weeks: (number | null)[][] = [];
    let days: (number | null)[] = [];

    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = startOffset - 1; i >= 0; i--) {
      days.push(-(daysInPrevMonth - i));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
      if (days.length === 7) {
        weeks.push(days);
        days = [];
      }
    }

    if (days.length > 0) {
      let nextDay = 1;
      while (days.length < 7) {
        days.push(-nextDay);
        nextDay++;
      }
      weeks.push(days);
    }

    return { weeks, daysInMonth, year, month };
  });

  protected selectedDate = computed(() => {
    const v = this.value();
    if (!v) return null;
    const [y, m, d] = v.split('-').map(Number);
    return { year: y, month: m, day: d };
  });

  protected today = computed(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  });

  constructor() {
    effect(() => {
      const v = this.value();
      if (v) {
        const [y, m] = v.split('-').map(Number);
        this.currentMonth.set(m - 1);
        this.currentYear.set(y);
        return;
      }

      const minStr = this.min();
      const maxStr = this.max();
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      if (minStr && today < minStr.slice(0, 7)) {
        const [y, m] = minStr.split('-').map(Number);
        this.currentMonth.set(m - 1);
        this.currentYear.set(y);
      } else if (maxStr && today > maxStr.slice(0, 7)) {
        const [y, m] = maxStr.split('-').map(Number);
        this.currentMonth.set(m - 1);
        this.currentYear.set(y);
      } else {
        this.currentMonth.set(now.getMonth());
        this.currentYear.set(now.getFullYear());
      }
    });
  }

  protected toggleCalendar(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
  }

  protected prevMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
  }

  protected nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
  }

  protected selectDate(day: number): void {
    if (day <= 0) return;
    const m = this.currentMonth() + 1;
    const y = this.currentYear();
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (this.min() && dateStr < this.min()) return;
    if (this.max() && dateStr > this.max()) return;

    this.value.set(dateStr);
    this.isOpen.set(false);
  }

  protected isSelected(day: number): boolean {
    if (day <= 0) return false;
    const sel = this.selectedDate();
    return sel !== null && sel.year === this.currentYear() && sel.month === this.currentMonth() + 1 && sel.day === day;
  }

  protected isToday(day: number): boolean {
    if (day <= 0) return false;
    const t = this.today();
    return t.year === this.currentYear() && t.month === this.currentMonth() + 1 && t.day === day;
  }

  protected isDisabled(day: number): boolean {
    if (day <= 0) return true;
    const m = this.currentMonth() + 1;
    const y = this.currentYear();
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (this.min() && dateStr < this.min()) return true;
    if (this.max() && dateStr > this.max()) return true;
    return false;
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }

  protected onFocus(): void {
    if (!this.disabled()) {
      this.isFocused.set(true);
    }
    this._stateChanges.next();
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this._stateChanges.next();
  }
}
