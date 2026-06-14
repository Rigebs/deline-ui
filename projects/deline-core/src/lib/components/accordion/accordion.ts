import {
  Component,
  input,
  output,
  signal,
  contentChildren,
  OnInit,
  effect,
  DestroyRef,
  inject,
} from '@angular/core';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-accordion-panel',
  imports: [IconComponent],
  host: {
    '[class.is-open]': 'isOpen()',
    '[attr.aria-expanded]': 'isOpen()',
  },
  templateUrl: './accordion-panel.html',
  styleUrl: './accordion.css',
})
export class AccordionPanel implements OnInit {
  header = input.required<string>();
  expanded = input<boolean>(false);
  disabled = input<boolean>(false);
  toggled = output<boolean>();

  isOpen = signal(false);
  protected bodyId = `accordion-body-${Math.random().toString(36).slice(2, 7)}`;
  protected headerId = `accordion-header-${Math.random().toString(36).slice(2, 7)}`;

  ngOnInit(): void {
    this.isOpen.set(this.expanded());
  }

  protected toggle(): void {
    if (this.disabled()) return;
    const newValue = !this.isOpen();
    this.isOpen.set(newValue);
    this.toggled.emit(newValue);
  }
}

@Component({
  selector: 'dln-accordion',
  imports: [],
  host: {
    '[class.is-multi]': 'multi()',
  },
  template: '<div class="accordion-wrapper"><ng-content></ng-content></div>',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .accordion-wrapper {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--dl-border-color);
        border-radius: var(--dl-radius);
        overflow: hidden;
        width: 100%;
      }
    `,
  ],
})
export class Accordion {
  multi = input<boolean>(false);
  panels = contentChildren(AccordionPanel);
  #destroyRef = inject(DestroyRef);

  constructor() {
    let subs: (() => void)[] = [];

    this.#destroyRef.onDestroy(() => {
      subs.forEach((fn) => fn());
      subs = [];
    });

    effect(() => {
      const currentPanels = this.panels();
      subs.forEach((fn) => fn());
      subs = [];

      currentPanels.forEach((panel) => {
        const sub = panel.toggled.subscribe((isOpen: boolean) => {
          if (!this.multi() && isOpen && currentPanels) {
            currentPanels.forEach((p) => {
              if (p !== panel && p.isOpen()) {
                p.isOpen.set(false);
                p.toggled.emit(false);
              }
            });
          }
        });
        subs.push(() => sub.unsubscribe());
      });
    });
  }
}
