import { Component, input, computed } from '@angular/core';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'dln-progress-bar',
  host: {
    '[class.is-indeterminate]': 'indeterminate()',
    '[attr.role]': `'progressbar'`,
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-label]': 'ariaLabel() || label()',
  },
  template: `
    <div class="progress-wrapper">
      @if (label()) {
        <div class="progress-header">
          <span class="progress-label">{{ label() }}</span>
          @if (showValue() && !indeterminate()) {
            <span class="progress-value">{{ displayValue() }}</span>
          }
        </div>
      }
      <div class="progress-track">
        <div
          class="progress-fill"
          [style.width.%]="indeterminate() ? undefined : percent()"
          [class]="'progress-fill progress-fill-' + variant()"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
        display: block;
        width: 100%;
        font-family: var(--dl-font-family);
    }
    .progress-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
    }
    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .progress-label {
        font-size: 0.8125rem;
        color: var(--dl-text);
        font-weight: 500;
    }
    .progress-value {
        font-size: 0.75rem;
        color: var(--dl-text-secondary);
    }
    .progress-track {
        width: 100%;
        height: 8px;
        background: var(--dl-neutral-bg);
        border-radius: 999px;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        border-radius: 999px;
        transition: width 0.3s ease;
    }
    .progress-fill-primary {
        background: var(--dl-primary);
    }
    .progress-fill-success {
        background: var(--dl-success);
    }
    .progress-fill-warning {
        background: var(--dl-warning);
    }
    .progress-fill-error {
        background: var(--dl-error);
    }
    :host(.is-indeterminate) .progress-fill {
        width: 40% !important;
        animation: progress-indeterminate 1.5s ease-in-out infinite;
    }
    @keyframes progress-indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
    }
  `],
})
export class ProgressBar {
  value = input<number>(0);
  max = input<number>(100);
  min = input<number>(0);
  label = input<string>('');
  variant = input<ProgressBarVariant>('primary');
  showValue = input<boolean>(false);
  indeterminate = input<boolean>(false);
  ariaLabel = input<string>('');

  protected percent = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    return ((this.value() - this.min()) / range) * 100;
  });

  protected displayValue = computed(() => {
    return `${Math.round(this.percent())}%`;
  });
}
