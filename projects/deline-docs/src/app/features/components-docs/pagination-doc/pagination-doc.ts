import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-pagination-doc',
  imports: [CommonModule, FormsModule, Pagination, ApiTable, CodeBlock],
  templateUrl: './pagination-doc.html',
  styleUrl: './pagination-doc.css',
})
export class PaginationDoc {
  showCode = signal(false);

  playTotal = signal(100);
  playPageSize = signal(10);
  playCurrent = signal(1);

  importCopied = signal(false);

  genCode = computed(() => {
    return `<dln-pagination
  [totalItems]="${this.playTotal()}"
  [pageSize]="${this.playPageSize()}"
  [currentPage]="${this.playCurrent()}"
  (pageChange)="onPageChange($event)">
</dln-pagination>`;
  });

  copyImport() {
    navigator.clipboard.writeText(`import { Pagination } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  onPageChange(page: number) {
    this.playCurrent.set(page);
  }

  inputProps: ApiTableRow[] = [
    { name: 'totalItems', type: 'number', default: '-', description: 'Número total de elementos a paginar.' },
    { name: 'pageSize', type: 'number', default: '-', description: 'Cantidad de elementos por página.' },
    { name: 'currentPage', type: 'number', default: '-', description: 'Página actual seleccionada.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'pageChange', type: 'number', default: '-', description: 'Emite el número de página cuando cambia.' },
  ];
}
