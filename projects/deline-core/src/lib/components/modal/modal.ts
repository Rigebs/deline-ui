import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input,
  output,
  effect,
  viewChild,
  ElementRef,
  contentChild,
  TemplateRef,
  computed,
} from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'dln-modal',
  imports: [NgTemplateOutlet],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  host: {
    '[class]': 'hostClasses()',
    '(document:keydown.escape)': 'onEscapeKey($event)',
  },
})
export class Modal {
  isOpen = input.required<boolean>();
  title = input<string>('');
  size = input<ModalSize>('md');
  closeOnBackdropClick = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('modalElement');

  // 👇 Usa TemplateRef para detectar el contenido proyectado
  protected footerContent = contentChild<TemplateRef<any>>('modalFooter');

  protected hostClasses = computed(() => [
    'modal-host',
    `modal-${this.size()}`,
  ].join(' '));

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.isOpen()) {
        el.showModal();
        document.body.style.overflow = 'hidden';
      } else {
        el.close();
        document.body.style.overflow = 'auto';
      }
    });
  }

  protected handleClose() {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent) {
    if (this.closeOnBackdropClick() && event.target === this.dialog().nativeElement) {
      this.handleClose();
    }
  }

  onEscapeKey(event: Event) {
    if (this.closeOnEscape() && this.isOpen()) {
      this.handleClose();
    }
  }
}
