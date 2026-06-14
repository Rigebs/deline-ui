import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Component({
  selector: 'dln-breadcrumb',
  imports: [CommonModule, IconComponent],
  host: {
    '[attr.aria-label]': `'breadcrumb'`,
  },
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        @for (item of items(); track $index; let last = $last) {
          <li class="breadcrumb-item">
            @if (item.route && !last) {
              <a class="breadcrumb-link" (click)="navigate.emit(item)" (keydown.enter)="navigate.emit(item)" tabindex="0">
                {{ item.label }}
              </a>
            } @else {
              <span class="breadcrumb-current" [attr.aria-current]="last ? 'page' : undefined">
                {{ item.label }}
              </span>
            }
            @if (!last) {
              <dln-icon name="chevron-right" size="small" class="breadcrumb-separator" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host {
        display: block;
        font-family: var(--dl-font-family);
    }
    .breadcrumb-list {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        list-style: none;
        padding: 0;
        margin: 0;
        flex-wrap: wrap;
    }
    .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8125rem;
    }
    .breadcrumb-link {
        color: var(--dl-primary);
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.2s;
    }
    .breadcrumb-link:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
    .breadcrumb-current {
        color: var(--dl-text-secondary);
        font-weight: 500;
    }
    .breadcrumb-separator {
        color: var(--dl-text-secondary);
        opacity: 0.5;
    }
  `],
})
export class Breadcrumb {
  items = input.required<BreadcrumbItem[]>();
  navigate = output<BreadcrumbItem>();
}
