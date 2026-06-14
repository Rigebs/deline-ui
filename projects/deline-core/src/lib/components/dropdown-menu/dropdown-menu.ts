import { Component, input, output, signal, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
}

@Component({
  selector: 'dln-dropdown-menu',
  imports: [CommonModule, IconComponent],
  host: {
    '[class.is-open]': 'isOpen()',
    '(document:click)': 'onClickOutside($event)',
    '(keydown)': 'onKeyDown($event)',
  },
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css',
})
export class DropdownMenu {
  items = input.required<DropdownItem[]>();
  label = input<string>('Opciones');
  iconOnly = input<boolean>(false);
  iconName = input<string>('more');
  align = input<'start' | 'end'>('end');
  itemSelected = output<DropdownItem>();

  protected isOpen = signal(false);
  private elementRef = inject(ElementRef);

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }

  protected select(item: DropdownItem): void {
    if (item.disabled || item.divider) return;
    this.itemSelected.emit(item);
    this.isOpen.set(false);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.isOpen.set(false);
  }

  protected onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
