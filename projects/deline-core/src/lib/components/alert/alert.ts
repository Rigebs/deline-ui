import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'dln-alert',
  imports: [CommonModule, IconComponent],
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': `'alert'`,
    '[attr.aria-live]': `'polite'`,
  },
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  variant = input<AlertVariant>('info');
  dismissible = input<boolean>(false);
  showIcon = input<boolean>(true);
  dismissed = output<void>();

  protected isVisible = true;

  protected hostClasses = computed(() => `alert alert-${this.variant()}`);

  get iconName(): string {
    switch (this.variant()) {
      case 'info': return 'info';
      case 'success': return 'check';
      case 'warning': return 'alert';
      case 'error': return 'close';
      default: return 'info';
    }
  }

  protected dismiss(): void {
    this.isVisible = false;
    this.dismissed.emit();
  }
}
