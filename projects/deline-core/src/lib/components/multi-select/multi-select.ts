import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOption, SelectOptionGroup } from '../../models/select.models';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-multi-select',
  imports: [CommonModule, IconComponent],
  host: {
    '[class.is-open]': 'isOpen()',
    '[class.is-disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-required]': 'required()',
    '(document:click)': 'onClickOutside($event)',
    '(keydown)': 'onKeyDown($event)',
  },
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css',
})
export class MultiSelect {
  private elementRef = inject(ElementRef);

  label = input.required<string>();
  options = input.required<(SelectOption | SelectOptionGroup)[]>();
  placeholder = input<string>('Selecciona opciones...');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  ariaLabel = input<string>('');
  ariaDescribedBy = input<string>('');

  value = input<unknown[]>([]);
  valueChange = output<unknown[]>();

  private _id = signal(`dln-multi-select-${Math.random().toString(36).slice(2, 9)}`);
  selectId = this._id.asReadonly();

  selectedItems = signal<SelectOption[]>([]);
  isOpen = signal(false);

  flatOptions = computed(() => {
    const opts: SelectOption[] = [];
    for (const item of this.options()) {
      if ('options' in item) {
        opts.push(...item.options);
      } else {
        opts.push(item);
      }
    }
    return opts;
  });

  availableOptions = computed(() => {
    const selectedValues = this.selectedItems().map((s) => s.value);
    return this.flatOptions().filter((opt) => !selectedValues.includes(opt.value) && !opt.disabled);
  });

  isOptionSelected = (value: unknown): boolean => {
    return this.selectedItems().some((s) => s.value === value);
  };

  displayText = computed(() => {
    const count = this.selectedItems().length;
    if (count === 0) return this.placeholder();
    if (count === 1) return this.selectedItems()[0].label;
    return `${count} opciones seleccionadas`;
  });

  constructor() {
    effect(() => {
      const vals = this.value();
      const opts = this.flatOptions().filter(o => vals.includes(o.value));
      this.selectedItems.set(opts);
    });
  }

  toggle(): void {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
  }

  select(option: SelectOption): void {
    if (option.disabled) return;
    this.selectedItems.update((prev) => [...prev, option]);
    this.valueChange.emit(this.selectedItems().map((s) => s.value));
  }

  remove(value: unknown, event: Event): void {
    event.stopPropagation();
    this.selectedItems.update((prev) => prev.filter((item) => item.value !== value));
    this.valueChange.emit(this.selectedItems().map((s) => s.value));
  }

  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;
    const opts = this.availableOptions();
    const focusedIndex = this.focusedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.toggle();
        else if (focusedIndex < opts.length - 1) this.focusedIndex.set(focusedIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen() && focusedIndex > 0) this.focusedIndex.set(focusedIndex - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen() && opts[focusedIndex]) this.select(opts[focusedIndex]);
        else this.toggle();
        break;
      case 'Escape':
        this.isOpen.set(false);
        break;
    }
  }

  focusedIndex = signal(-1);
}
