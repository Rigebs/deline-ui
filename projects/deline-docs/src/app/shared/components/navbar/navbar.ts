import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ALL_COMPONENTS, CATEGORY_LABELS } from '../../data/components';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  theme = inject(ThemeService);
  router = inject(Router);
  menuToggle = output<void>();

  query = signal('');
  showResults = signal(false);

  filtered = signal<{ label: string; route: string; category: string }[]>([]);

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.query.set(input);
    if (!input.trim()) {
      this.filtered.set([]);
      this.showResults.set(false);
      return;
    }
    const q = input.toLowerCase();
    const results = ALL_COMPONENTS
      .filter(c => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || CATEGORY_LABELS[c.category].toLowerCase().includes(q))
      .map(c => ({ label: c.label, route: c.route, category: CATEGORY_LABELS[c.category] }))
      .slice(0, 8);
    this.filtered.set(results);
    this.showResults.set(results.length > 0);
  }

  selectResult(route: string): void {
    this.query.set('');
    this.showResults.set(false);
    this.router.navigateByUrl(route);
  }

  onSearchFocus(): void {
    if (this.query().trim()) {
      this.showResults.set(this.filtered().length > 0);
    }
  }

  closeResults(): void {
    setTimeout(() => this.showResults.set(false), 200);
  }
}
