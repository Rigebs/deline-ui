import { Component, input, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'default' | 'success' | 'info' | 'warning' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'dln-button',
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || isLoading() ? "true" : null',
    '[style.pointer-events]': 'isLoading() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabled() || isLoading()',
    '[attr.aria-busy]': 'isLoading()',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleKeyDown($event)',
    '(keydown.space)': 'handleKeyDown($event)',
  },
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<ButtonVariant>('solid');
  color = input<ButtonColor>('default');
  size = input<ButtonSize>('md');

  type = input<ButtonType>('button');
  disabled = input(false);
  isLoading = input(false);
  isIconOnly = input(false);
  fullWidth = input(false);

  href = input<string>('');
  routerLink = input<string | (string | number)[] | null>(null);
  routerLinkActive = input<string>('');
  routerLinkExact = input(false);
  target = input<string>('');

  btnClick = output<MouseEvent>();

  protected isLink = computed(() => !!this.href() || this.routerLink() !== null);
  protected computedType = computed(() => this.isLink() ? undefined : this.type());

  protected hostClasses = computed(() =>
    [
      'btn',
      `btn-${this.variant()}`,
      `btn-${this.color()}`,
      `btn-${this.size()}`,
      this.isLoading() && 'btn-loading',
      this.isIconOnly() && 'btn-icon-only',
      this.fullWidth() && 'btn-full-width',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected handleClick(event: Event): void {
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      return;
    }
    if (this.isLink()) {
      return;
    }
    this.btnClick.emit(event as MouseEvent);
  }

  protected handleKeyDown(event: Event): void {
    if (this.disabled() || this.isLoading() || this.isLink()) return;
    event.preventDefault();
    this.btnClick.emit(event as MouseEvent);
  }
}
