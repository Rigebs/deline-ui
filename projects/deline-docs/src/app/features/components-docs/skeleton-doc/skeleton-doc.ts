import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skeleton } from 'deline-core';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-skeleton-doc',
  imports: [CommonModule, Skeleton, CodeBlock],
  templateUrl: './skeleton-doc.html',
})
export class SkeletonDoc {
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Skeleton } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  inputProps = [
    { name: 'width', type: 'string', default: "'100%'", description: 'Ancho del skeleton.' },
    { name: 'height', type: 'string', default: "'1rem'", description: 'Alto del skeleton.' },
    { name: 'shape', type: "'text' | 'rect' | 'circle'", default: "'text'", description: 'Forma visual del skeleton.' },
  ];
}
