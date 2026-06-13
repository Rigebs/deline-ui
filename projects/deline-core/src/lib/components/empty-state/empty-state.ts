import { NgTemplateOutlet } from '@angular/common';
import { Component, input, contentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dln-empty-state',
  imports: [NgTemplateOutlet],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  title = input.required<string>();
  description = input<string>('');
  iconPath = input<string>(''); // legacy opcional

  protected iconContent = contentChild<TemplateRef<any>>('icon');
}
