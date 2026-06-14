import { Component, input, output, signal } from '@angular/core';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-accordion-panel',
  imports: [IconComponent],
  host: {
    '[class.is-open]': 'expanded()',
    '[attr.aria-expanded]': 'expanded()',
  },
  templateUrl: './accordion-panel.html',
  styleUrl: './accordion.css',
})
export class AccordionPanel {
  header = input.required<string>();
  expanded = input<boolean>(false);
  disabled = input<boolean>(false);
  toggled = output<boolean>();

  protected isOpen = signal(false);
  protected bodyId = `accordion-body-${Math.random().toString(36).slice(2, 7)}`;
  protected headerId = `accordion-header-${Math.random().toString(36).slice(2, 7)}`;

  constructor() {
    // Sync input signal to internal state
    this.isOpen.set(this.expanded());
  }

  protected toggle(): void {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
    this.toggled.emit(this.isOpen());
  }
}

@Component({
  selector: 'dln-accordion',
  host: {
    '[class.is-multi]': 'multi()',
  },
  template: '<div class="accordion-wrapper"><ng-content></ng-content></div>',
  styles: [`
    .accordion-wrapper {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--dl-border-color);
        border-radius: var(--dl-radius);
        overflow: hidden;
    }
  `],
})
export class Accordion {
  multi = input<boolean>(false);
}
