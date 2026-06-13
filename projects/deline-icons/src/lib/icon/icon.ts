import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IconService } from '../services/icon-service';

@Component({
  selector: 'dln-icon',
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class IconComponent {
  // Inputs como Signals
  name = input.required<string>();
  size = input<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  color = input<string | undefined>(undefined);

  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  // Computed reacciona automáticamente a cambios en name()
  iconSvg = computed<SafeHtml>(() => {
    const svgData = this.iconService.get(this.name());
    if (svgData) {
      return this.sanitizer.bypassSecurityTrustHtml(svgData);
    }
    console.warn(`Icon "${this.name()}" not found.`);
    return '';
  });
}
