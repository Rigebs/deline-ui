import { Component, signal } from '@angular/core';
import { Search } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-search-doc',
  imports: [Search, ApiTable, CodeBlock],
  templateUrl: './search-doc.html',
})
export class SearchDoc {
  showCode = signal(false);
  searchQuery = signal('');
  searchResults = signal('');
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { Search } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  onSearched(query: string) {
    this.searchResults.set(`Buscaste: "${query}"`);
  }

  onCleared() {
    this.searchResults.set('Búsqueda limpiada');
  }

  inputProps: ApiTableRow[] = [
    { name: 'value', type: 'string', default: "''", description: 'Valor del input (modelo bidireccional).' },
    { name: 'placeholder', type: 'string', default: "'Buscar...'", description: 'Placeholder del campo.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo.' },
    { name: 'debounceMs', type: 'number', default: '300', description: 'Retardo en ms antes de emitir searched.' },
    { name: 'ariaLabel', type: 'string', default: "'Buscar'", description: 'Etiqueta ARIA para accesibilidad.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'searched', type: 'string', default: '-', description: 'Emite el texto al escribir (con debounce) o al submit.' },
    { name: 'cleared', type: 'void', default: '-', description: 'Emite cuando se limpia la búsqueda.' },
  ];
}
