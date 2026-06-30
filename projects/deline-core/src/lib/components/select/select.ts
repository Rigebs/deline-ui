import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { SelectOption, SelectOptionGroup } from '../../models/select.models';
import { IconComponent } from 'deline-icons';
import { DlnControl, DLN_CONTROL } from '../../core/control';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'dln-select',
  imports: [CommonModule, IconComponent],
  providers: [{ provide: DLN_CONTROL, useExisting: forwardRef(() => Select) }],
  host: {
    '[class.is-open]': 'isOpen()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-focused]': 'isFocused()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-required]': 'required()',
    '(document:click)': 'onClickOutside($event)',
  },
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select implements DlnControl {
  private elementRef = inject(ElementRef);
  private parentFormField = inject(FormField, { optional: true, skipSelf: true });

  label = input.required<string>();
  options = input.required<(SelectOption | SelectOptionGroup)[]>();
  placeholder = input<string>('Selecciona una opción');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  ariaLabel = input<string>('');
  ariaDescribedBy = input<string>('');

  private _id = signal(`dln-select-${Math.random().toString(36).slice(2, 9)}`);
  selectId = this._id.asReadonly();

  value = input<unknown>(null);
  valueChange = output<unknown>();

  selectedOption = signal<SelectOption | null>(null);
  isOpen = signal(false);
  protected isFocused = signal(false);

  readonly focused = this.isFocused.asReadonly();
  readonly id = this._id();

  private _stateChanges = new Subject<void>();
  readonly stateChanges = this._stateChanges.asObservable();

  get hasError(): boolean {
    return false;
  }

  get formControl(): FormControl | null {
    return null;
  }

  displayText = computed(() => this.selectedOption()?.label || this.placeholder());

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

  renderedItems = computed<({ kind: 'header'; label: string } | { kind: 'option'; option: SelectOption; flatIndex: number })[]>(() => {
    const items: ({ kind: 'header'; label: string } | { kind: 'option'; option: SelectOption; flatIndex: number })[] = [];
    let idx = 0;

    for (const item of this.options()) {
      if ('options' in item) {
        const available = item.options.filter((o) => !o.disabled);
        if (available.length > 0) {
          items.push({ kind: 'header', label: item.label });
          for (const opt of available) {
            items.push({ kind: 'option', option: opt, flatIndex: idx++ });
          }
        }
      } else {
        if (!item.disabled) {
          items.push({ kind: 'option', option: item, flatIndex: idx++ });
        }
      }
    }
    return items;
  });

  availableOptions = computed(() =>
    this.renderedItems().filter((i): i is { kind: 'option'; option: SelectOption; flatIndex: number } => i.kind === 'option').map((i) => i.option),
  );

  focusedIndex = signal(-1);

  protected hasParentFormField = computed(() => !!this.parentFormField);

  constructor() {
    effect(() => {
      const val = this.value();
      const opt = this.flatOptions().find(o => o.value === val);
      this.selectedOption.set(opt ?? null);
    });
  }

  toggle(): void {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.focusedIndex.set(-1);
    } else {
      const selected = this.selectedOption();
      if (selected) {
        const idx = this.availableOptions().findIndex((o) => o.value === selected.value);
        this.focusedIndex.set(idx >= 0 ? idx : 0);
      } else {
        this.focusedIndex.set(0);
      }
    }
  }

  select(option: SelectOption): void {
    if (option.disabled) return;
    this.selectedOption.set(option);
    this.valueChange.emit(option.value);
    this.isOpen.set(false);
  }

  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;
    const opts = this.availableOptions();
    const fi = this.focusedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.toggle();
        else if (fi < opts.length - 1) this.focusedIndex.set(fi + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen() && fi > 0) this.focusedIndex.set(fi - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen() && opts[fi]) this.select(opts[fi]);
        else this.toggle();
        break;
      case 'Escape':
        this.isOpen.set(false);
        break;
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
