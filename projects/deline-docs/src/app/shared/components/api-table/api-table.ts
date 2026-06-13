import { Component, input } from '@angular/core';

export interface ApiTableRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.html',
})
export class ApiTable {
  title = input.required<string>();
  rows = input.required<ApiTableRow[]>();
  typeLabel = input<string>('Tipo');
  defaultLabel = input<string>('Defecto');
}
