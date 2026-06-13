import { Provider } from '@angular/core';
import { ThemeService } from './services/theme.service';

export function provideCore(): Provider[] {
  return [ThemeService];
}
