import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyState, Button } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-empty-state-doc',
  imports: [CommonModule, FormsModule, EmptyState, Button, ApiTable, CodeBlock],
  templateUrl: './empty-state-doc.html',
  styleUrl: './empty-state-doc.css',
})
export class EmptyStateDoc {
  showCode = signal(false);
  importCopied = signal(false);

  playTitle = signal('Sin resultados');
  playDescription = signal('No encontramos lo que buscas. Intenta ajustar los filtros.');
  playHasAction = signal(true);

  copyImport() {
    navigator.clipboard.writeText(`import { EmptyState } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-empty-state'];
    parts.push(`\n  title="${this.playTitle()}"`);
    if (this.playDescription()) {
      parts.push(`\n  description="${this.playDescription()}"`);
    }
    parts.push('>');
    if (this.playHasAction()) {
      parts.push('\n  <dln-button>Reintentar</dln-button>');
    }
    parts.push('\n</dln-empty-state>');
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'title', type: 'string', default: '— (required)', description: 'Título principal del estado vacío.' },
    { name: 'description', type: 'string', default: "''", description: 'Descripción opcional que acompaña al título.' },
    { name: 'iconPath', type: 'string', default: "''", description: 'Ruta a un icono SVG para mostrar sobre el título.' },
  ];

  contentProps: ApiTableRow[] = [
    { name: '<ng-content>', type: '—', default: '—', description: 'Proyecta contenido de acción (botones, enlaces) debajo del texto.' },
    { name: '#icon (TemplateRef)', type: '—', default: '—', description: 'Referencia a un template para un icono personalizado.' },
  ];
}
