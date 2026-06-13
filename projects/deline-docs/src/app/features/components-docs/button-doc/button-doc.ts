import { Component, computed, signal, afterNextRender } from '@angular/core';
import { Button, ButtonColor, ButtonVariant } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-button-doc',
  imports: [Button, ApiTable, CodeBlock],
  templateUrl: './button-doc.html',
})
export class ButtonDoc {
  variant = signal<'solid' | 'outlined' | 'text'>('solid');
  color = signal<'primary' | 'secondary' | 'danger'>('primary');
  size = signal<'sm' | 'md' | 'lg'>('md');
  disabled = signal(false);
  loading = signal(false);

  showCode = signal(false);

  playVariant = computed<ButtonVariant>(() => {
    const v = this.variant();
    if (v === 'outlined') return 'outline';
    if (v === 'text') return 'ghost';
    return 'solid';
  });

  playColor = computed<ButtonColor>(() => {
    const map: Record<string, ButtonColor> = { primary: 'default', secondary: 'info', danger: 'error' };
    return map[this.color()] ?? 'default';
  });

  playSize = computed(() => this.size() as 'sm' | 'md' | 'lg');

  setVariant(v: string) { this.variant.set(v as any); }
  setColor(c: string) { this.color.set(c as any); }
  setSize(s: string) { this.size.set(s as any); }
  setDisabled(d: boolean) { this.disabled.set(d); }
  setLoading(l: boolean) { this.loading.set(l); }
  toggleCode() { this.showCode.update(v => !v); }

  genCode = computed(() =>
    `<dln-button variant="${this.playVariant()}" color="${this.playColor()}" size="${this.playSize()}"${this.disabled() ? ' disabled' : ''}${this.loading() ? ' isLoading' : ''}>${this.loading() ? 'Cargando...' : 'Acción Base'}</dln-button>`
  );

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Button } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  inputProps: ApiTableRow[] = [
    { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", description: 'Define el estilo visual estructural.' },
    { name: 'color', type: "'default' | 'success' | 'info' | 'warning' | 'error'", default: "'default'", description: 'Define el color temático de la paleta.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Define las dimensiones de escala física.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción de clics y muta la visualización.' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Reemplaza contenido por un spinner y congela la acción.' },
  ];
}
