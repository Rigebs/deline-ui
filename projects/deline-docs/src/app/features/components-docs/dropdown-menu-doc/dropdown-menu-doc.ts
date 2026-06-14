import { Component, signal } from '@angular/core';
import { DropdownMenu, DropdownItem } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-dropdown-menu-doc',
  imports: [DropdownMenu, ApiTable, CodeBlock],
  templateUrl: './dropdown-menu-doc.html',
})
export class DropdownMenuDoc {
  showCode = signal(false);
  lastSelected = signal('');
  importCopied = signal(false);

  copyImport() {
    navigator.clipboard.writeText(`import { DropdownMenu } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  items: DropdownItem[] = [
    { label: 'Editar', value: 'edit', icon: 'edit' },
    { label: 'Copiar', value: 'copy', icon: 'copy' },
    { label: 'Mover', value: 'move', icon: 'folder' },
    { divider: true, label: '', value: '' },
    { label: 'Eliminar', value: 'delete', icon: 'delete', disabled: true },
  ];

  onItemSelected(item: DropdownItem) {
    this.lastSelected.set(item.label);
  }

  inputProps: ApiTableRow[] = [
    { name: 'items', type: 'DropdownItem[]', default: '-', description: 'Lista de ítems del menú (requerido).' },
    { name: 'label', type: 'string', default: "'Opciones'", description: 'Texto del botón trigger.' },
    { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Muestra solo el ícono como trigger.' },
    { name: 'iconName', type: 'string', default: "'more'", description: 'Nombre del ícono para modo iconOnly.' },
    { name: 'align', type: "'start' | 'end'", default: "'end'", description: 'Alineación del dropdown.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'itemSelected', type: 'DropdownItem', default: '-', description: 'Emite el ítem seleccionado.' },
  ];
}
