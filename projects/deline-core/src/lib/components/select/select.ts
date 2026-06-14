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
    '(keydown)': 'onKeyDown($event)',
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
    const opts = this.flatOptions().filter(o => !o.disabled);
    const currentIndex = this.selectedOption() ? opts.findIndex(o => o.value === this.selectedOption()!.value) : -1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.toggle();
        else if (currentIndex < opts.length - 1) this.selectedOption.set(opts[currentIndex + 1]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen() && currentIndex > 0) this.selectedOption.set(opts[currentIndex - 1]);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen() && this.selectedOption()) this.select(this.selectedOption()!);
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
