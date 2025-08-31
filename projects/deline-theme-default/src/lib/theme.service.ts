import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = false;

  toggleDark() {
    this.dark = !this.dark;
    document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light');
  }

  setDark(dark: boolean) {
    this.dark = dark;
    document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.dark;
  }
}
