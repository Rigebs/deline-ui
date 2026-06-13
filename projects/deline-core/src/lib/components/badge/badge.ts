import { Component, input, computed } from '@angular/core';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'dln-badge',
  host: {
    '[class]': 'badgeClasses()',
  },
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  variant = input<BadgeVariant>('neutral');

  protected badgeClasses = computed(() => {
    return `badge-variant-${this.variant()}`;
  });
}
