import { Component, signal, computed } from '@angular/core';
import { Badge } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badge-doc',
  imports: [Badge, ApiTable, CodeBlock, FormsModule],
  templateUrl: './badge-doc.html',
})
export class BadgeDoc {
  showCode = signal(false);
  playVariant = signal<'success' | 'warning' | 'error' | 'info' | 'neutral'>('neutral');

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Badge } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const variant = this.playVariant();
    let code = `<dln-badge`;
    if (variant !== 'neutral') {
      code += `\n  variant="${variant}"`;
    }
    code += `>\n  Etiqueta\n</dln-badge>`;
    return code;
  });

  inputProps: ApiTableRow[] = [
    { name: 'variant', type: "'success' | 'warning' | 'error' | 'info' | 'neutral'", default: "'neutral'", description: 'Define el color y estilo visual del badge.' },
  ];
}
