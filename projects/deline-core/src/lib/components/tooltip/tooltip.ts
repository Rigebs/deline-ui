import { Component, input, signal } from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'dln-tooltip',
  host: {
    '[class.show]': 'isVisible()',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focusin)': 'show()',
    '(focusout)': 'hide()',
    '[attr.tabindex]': '0',
  },
  template: `
    <div class="tooltip-trigger">
      <ng-content></ng-content>
    </div>
    @if (isVisible() && text()) {
      <div class="tooltip-content" [class]="'tooltip-' + position()" role="tooltip">
        {{ text() }}
      </div>
    }
  `,
  styles: [`
    :host {
        position: relative;
        display: inline-flex;
        cursor: pointer;
        outline: none;
    }
    .tooltip-trigger {
        display: inline-flex;
    }
    .tooltip-content {
        position: absolute;
        z-index: 1000;
        padding: 0.375rem 0.75rem;
        background: var(--dl-text);
        color: var(--dl-bg);
        font-size: 0.75rem;
        border-radius: 4px;
        white-space: nowrap;
        pointer-events: none;
        font-family: var(--dl-font-family);
        line-height: 1.4;
    }
    .tooltip-top {
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
    }
    .tooltip-bottom {
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
    }
    .tooltip-left {
        right: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
    }
    .tooltip-right {
        left: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
    }
    :host(.show) .tooltip-content {
        animation: tooltip-fade-in 0.15s ease;
    }
    @keyframes tooltip-fade-in {
        from { opacity: 0; transform: translateX(-50%) translateY(2px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `],
})
export class Tooltip {
  text = input.required<string>();
  position = input<TooltipPosition>('top');
  delay = input<number>(300);

  protected isVisible = signal(false);
  private timer: ReturnType<typeof setTimeout> | null = null;

  protected show(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.isVisible.set(true), this.delay());
  }

  protected hide(): void {
    if (this.timer) clearTimeout(this.timer);
    this.isVisible.set(false);
  }
}
