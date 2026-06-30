import { Injectable } from '@angular/core';
import { ICON_REGISTRY, IconName } from '../icon/icon-registry';

export interface IconData {
  name: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private icons: Map<string, string> = new Map();

  constructor() {
    this.registerDefaultIcons();
  }

  private registerDefaultIcons(): void {
    Object.entries(ICON_REGISTRY).forEach(([name, svg]) => {
      this.register(name, svg);
    });
  }

  register(name: string, svgData: string): void {
    this.icons.set(name, svgData);
  }

  get(name: IconName | string): string | undefined {
    return this.icons.get(name);
  }

  getAll(): string[] {
    return Array.from(this.icons.keys());
  }

  has(name: string): boolean {
    return this.icons.has(name);
  }
}
