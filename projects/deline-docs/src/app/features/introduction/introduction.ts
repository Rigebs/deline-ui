import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALL_COMPONENTS, CATEGORY_LABELS, type ComponentCategory } from '../../shared/data/components';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink],
  templateUrl: './introduction.html',
})
export class Introduction {
  protected readonly CATEGORY_LABELS = CATEGORY_LABELS;
  protected readonly ALL_COMPONENTS = ALL_COMPONENTS;

  categories: { key: ComponentCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Todos' },
    ...(Object.entries(CATEGORY_LABELS) as [ComponentCategory, string][]).map(([key, label]) => ({ key, label })),
  ];

  activeCategory = signal<ComponentCategory | 'all'>('all');

  filteredComponents = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return ALL_COMPONENTS;
    return ALL_COMPONENTS.filter(c => c.category === cat);
  });

  installCopied = signal(false);

  setCategory(cat: ComponentCategory | 'all'): void {
    this.activeCategory.set(cat);
  }

  copyInstall(): void {
    navigator.clipboard.writeText('npm install deline-core deline-icons').then(() => {
      this.installCopied.set(true);
      setTimeout(() => this.installCopied.set(false), 2000);
    });
  }
}
