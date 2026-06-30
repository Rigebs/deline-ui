const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export class FocusTrap {
  private element: HTMLElement;
  private previousFocused: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate(): void {
    this.previousFocused = document.activeElement as HTMLElement | null;
    this.element.addEventListener('keydown', this.handleKeydown);

    const focusable = this.getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  deactivate(): void {
    this.element.removeEventListener('keydown', this.handleKeydown);
    this.previousFocused?.focus();
    this.previousFocused = null;
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    const focusable = this.getFocusableElements();
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  private getFocusableElements(): HTMLElement[] {
    return Array.from(this.element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  }
}
