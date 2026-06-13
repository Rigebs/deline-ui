import { Component, input, computed, contentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

@Component({
  selector: 'dln-table',
  imports: [CommonModule, IconComponent],
  templateUrl: './table.html',
  styleUrl: './table.css',
  host: {
    '[class.is-hoverable]': 'hoverable()',
  },
})
export class Table {
  data = input.required<Record<string, any>[]>();
  columns = input.required<TableColumn[]>();
  hoverable = input<boolean>(true);

  cellTemplate = contentChild<TemplateRef<any>>(TemplateRef);
  isEmpty = computed(() => this.data().length === 0);
}
