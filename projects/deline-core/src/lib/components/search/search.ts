import { Component, input, output, signal, model, inject, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-search',
  imports: [CommonModule, IconComponent],
  host: {
    '[class.is-focused]': 'isFocused()',
    '[class.has-value]': '!!value()',
  },
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  value = model<string>('');
  placeholder = input<string>('Buscar...');
  disabled = input<boolean>(false);
  debounceMs = input<number>(300);
  ariaLabel = input<string>('Buscar');
  searched = output<string>();
  cleared = output<void>();

  protected isFocused = signal(false);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private inputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searched.emit(val);
    }, this.debounceMs());
  }

  protected clear(): void {
    this.value.set('');
    this.cleared.emit();
    this.searched.emit('');
    this.inputRef()?.nativeElement.focus();
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.searched.emit(this.value());
  }

  protected onFocus(): void {
    if (!this.disabled()) this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
  }
}
