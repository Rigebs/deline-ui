import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-pagination',
  imports: [CommonModule, IconComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  totalItems = input.required<number>();
  pageSize = input.required<number>();
  currentPage = input.required<number>();

  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()) || 1);

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
