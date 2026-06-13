import { Component, signal, computed } from '@angular/core';
import { FileUpload } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-file-upload-doc',
  imports: [FileUpload, ApiTable, CodeBlock],
  templateUrl: './file-upload-doc.html',
})
export class FileUploadDoc {
  uploadedFile = signal<string | null>(null);
  showCode = signal(false);
  importCopied = signal(false);

  genCode = computed(() => {
    return `<dln-file-upload (fileSelected)="onFile($event)"></dln-file-upload>`;
  });

  onFile(file: File) {
    this.uploadedFile.set(file.name);
  }

  copyImport() {
    navigator.clipboard.writeText(`import { FileUpload } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  outputProps: ApiTableRow[] = [
    { name: 'fileSelected', type: 'File', default: '-', description: 'Emite el archivo seleccionado cuando el usuario lo adjunta.' },
  ];
}
