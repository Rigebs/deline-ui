import { Component, signal, computed } from '@angular/core';
import { Avatar } from 'deline-core';
import { FormsModule } from '@angular/forms';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-avatar-doc',
  imports: [Avatar, FormsModule, ApiTable, CodeBlock],
  templateUrl: './avatar-doc.html',
})
export class AvatarDoc {
  showCode = signal(false);
  playName = signal('Usuario');
  playSize = signal<'sm' | 'md' | 'lg'>('md');
  playSrc = signal('');

  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Avatar } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-avatar'];
    parts.push(`\n  name="${this.playName()}"`);
    if (this.playSize() !== 'md') {
      parts.push(`\n  size="${this.playSize()}"`);
    }
    if (this.playSrc()) {
      parts.push(`\n  src="${this.playSrc()}"`);
    }
    parts.push(`\n></dln-avatar>`);
    return parts.join('');
  });

  inputProps: ApiTableRow[] = [
    { name: 'name', type: 'string', default: "''", description: 'Nombre del usuario. Genera iniciales y color de fondo.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del avatar.' },
    { name: 'src', type: 'string | null | undefined', default: 'null', description: 'URL de la imagen del usuario.' },
  ];
}
