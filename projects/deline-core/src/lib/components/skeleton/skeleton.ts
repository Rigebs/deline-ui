import { Component, computed, input } from '@angular/core';

export type SkeletonShape = 'text' | 'rect' | 'circle';

@Component({
  selector: 'dln-skeleton',
  host: {
    '[class]': 'shapeClass()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[class.animate-pulse]': 'true',
  },
  template: '',
  styleUrl: './skeleton.css',
})
export class Skeleton {
  width = input<string>('100%');
  height = input<string>('1rem');
  shape = input<SkeletonShape>('text');

  shapeClass = computed(() => `skeleton-${this.shape()}`);
}
