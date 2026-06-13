import { Component, signal, computed } from '@angular/core';
import { Card, Button } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-card-doc',
  imports: [Card, Button, ApiTable, CodeBlock],
  templateUrl: './card-doc.html',
})
export class CardDoc {
  showCode = signal(false);
  playPadding = signal('1.5rem');
  playHoverable = signal(false);
  playShadow = signal(true);

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Card } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() =>
    `<dln-card padding="${this.playPadding()}"${this.playHoverable() ? '\n       hoverable' : ''}${!this.playShadow() ? '\n       [shadow]="false"' : ''}>\n  <span card-header>Título</span>\n  <p>Contenido de la tarjeta.</p>\n  <dln-button card-footer size="sm">Acción</dln-button>\n</dln-card>`
  );

  inputProps: ApiTableRow[] = [
    { name: 'padding', type: 'string', default: "'1.5rem'", description: 'Define el padding interno de la tarjeta.' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Añade efecto hover de elevación.' },
    { name: 'shadow', type: 'boolean', default: 'true', description: 'Muestra sombra en la tarjeta.' },
  ];
}
