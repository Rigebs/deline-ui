import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  mode = signal<ThemeMode>('light');

  constructor() {
    const stored = localStorage.getItem('deline-theme') as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    this.mode.set(initial);
    this.apply(initial);

    effect(() => {
      const m = this.mode();
      localStorage.setItem('deline-theme', m);
      this.apply(m);
    });
  }

  toggle() {
    this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
  }

  setMode(m: ThemeMode) {
    this.mode.set(m);
  }

  private apply(m: ThemeMode) {
    document.documentElement.classList.toggle('dark', m === 'dark');
  }
}
