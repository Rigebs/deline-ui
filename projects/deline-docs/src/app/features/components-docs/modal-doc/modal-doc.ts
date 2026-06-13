import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal, ModalSize, Button } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-modal-doc',
  imports: [Modal, Button, ApiTable, CodeBlock, FormsModule],
  templateUrl: './modal-doc.html',
  styleUrl: './modal-doc.css',
})
export class ModalDoc {
  showCode = signal(false);
  isOpen = signal(false);
  playTitle = signal('Modal de ejemplo');
  selectedSize = signal<ModalSize>('md');
  showFooter = signal(true);
  importCopied = signal(false);

  isOpenSize = signal(false);
  demoSize = signal<ModalSize>('md');

  sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

  copyImport() {
    navigator.clipboard.writeText(`import { Modal } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  openSizeDemo(size: ModalSize) {
    this.demoSize.set(size);
    this.isOpenSize.set(true);
  }

  genCode = computed(() => {
    const title = this.playTitle();
    const size = this.selectedSize();
    const footer = this.showFooter();
    const parts = ['<dln-modal'];
    parts.push(`\n  [isOpen]="isOpen"`);
    parts.push(`\n  title="${title}"`);
    if (size !== 'md') {
      parts.push(`\n  size="${size}"`);
    }
    parts.push(`\n  (closed)="isOpen = false"`);
    parts.push(`>`);
    parts.push(`\n  <p>Contenido del modal</p>`);
    if (footer) {
      parts.push(`\n  <ng-template #modalFooter>`);
      parts.push(`\n    <dln-button variant="ghost" (click)="isOpen = false">Cancelar</dln-button>`);
      parts.push(`\n    <dln-button (click)="confirmar()">Aceptar</dln-button>`);
      parts.push(`\n  </ng-template>`);
    }
    parts.push(`\n</dln-modal>`);
    return parts.join('');
  });

  genSizeCode = (size: ModalSize) =>
    `<dln-modal\n  [isOpen]="isOpen"\n  title="Modal ${size}"\n  size="${size}"\n  (closed)="isOpen = false">\n  <p>Modal de tamaño ${size}.</p>\n  <ng-template #modalFooter>\n    <dln-button (click)="isOpen = false">Cerrar</dln-button>\n  </ng-template>\n</dln-modal>`;

  confirmationCode = `<dln-modal
  [isOpen]="showConfirm"
  title="Confirmar acci\u00f3n"
  (closed)="showConfirm = false">
  <p>\u00bfEst\u00e1s seguro de eliminar este elemento?</p>
  <ng-template #modalFooter>
    <dln-button variant="ghost" (click)="showConfirm = false">Cancelar</dln-button>
    <dln-button color="error" (click)="eliminar()">Eliminar</dln-button>
  </ng-template>
</dln-modal>`;

  formModalCode = `<dln-modal
  [isOpen]="showForm"
  title="Editar perfil"
  size="lg"
  (closed)="showForm = false">
  <form (ngSubmit)="guardar()">
    <dln-input label="Nombre" [(ngModel)]="nombre" name="nombre" />
    <dln-input label="Email" [(ngModel)]="email" name="email" />
  </form>
  <ng-template #modalFooter>
    <dln-button variant="ghost" (click)="showForm = false">Cancelar</dln-button>
    <dln-button type="submit" (click)="guardar()">Guardar</dln-button>
  </ng-template>
</dln-modal>`;

  inputProps: ApiTableRow[] = [
    { name: 'isOpen', type: 'boolean', default: '—', description: 'Controla la visibilidad del modal (requerido).' },
    { name: 'title', type: 'string', default: "''", description: 'Título mostrado en el encabezado del modal.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Define el ancho del modal.' },
    { name: 'closeOnBackdropClick', type: 'boolean', default: 'true', description: 'Cierra el modal al hacer clic fuera del contenido.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Cierra el modal al presionar la tecla Escape.' },
  ];

  outputProps: ApiTableRow[] = [
    { name: 'closed', type: 'void', default: '—', description: 'Se emite cuando el modal se cierra.' },
  ];
}
