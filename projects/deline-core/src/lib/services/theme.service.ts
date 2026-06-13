import { Injectable, PLATFORM_ID, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  mode = signal<'light' | 'dark'>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
      this.applyTheme();
    }
  }

  setMode(mode: 'light' | 'dark') {
    this.mode.set(mode); // Actualiza el signal
    this.saveToStorage();
    this.applyTheme();
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    const body = document.body;

    // Eliminamos modos anteriores y aplicamos el nuevo
    body.classList.remove('light', 'dark');
    body.classList.add(this.mode());
  }

  private saveToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('deline-mode', this.mode());
    }
  }

  private loadFromStorage() {
    const savedMode = localStorage.getItem('deline-mode') as 'light' | 'dark';
    if (savedMode) {
      this.mode.set(savedMode);
    }
  }
}
