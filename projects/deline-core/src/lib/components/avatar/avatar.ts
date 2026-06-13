import { Component, input, signal, computed } from '@angular/core';

@Component({
  selector: 'dln-avatar',
  host: {
    '[class]': 'hostClasses()',
    '[style.--avatar-bg]': 'bgColor()',
    '[style.--avatar-color]': 'textColor()',
  },
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  src = input<string | null | undefined>(null);
  name = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

  protected imageError = signal(false);

  protected hostClasses = computed(() => `avatar-size-${this.size()}`);

  protected initials = computed(() => this.name().trim().charAt(0).toUpperCase());

  protected bgColor = computed(() => {
    const colors = [
      'var(--dl-avatar-bg-1)',
      'var(--dl-avatar-bg-2)',
      'var(--dl-avatar-bg-3)',
      'var(--dl-avatar-bg-4)',
      'var(--dl-avatar-bg-5)',
      'var(--dl-avatar-bg-6)',
    ];
    return colors[this.name().charCodeAt(0) % colors.length];
  });

  protected textColor = computed(() => {
    const colors = [
      'var(--dl-avatar-color-1)',
      'var(--dl-avatar-color-2)',
      'var(--dl-avatar-color-3)',
      'var(--dl-avatar-color-4)',
      'var(--dl-avatar-color-5)',
      'var(--dl-avatar-color-6)',
    ];
    return colors[this.name().charCodeAt(0) % colors.length];
  });

  protected handleImageError() {
    this.imageError.set(true);
  }
}
