import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  status: string;
  rol: string;
}

@Component({
  selector: 'app-table-doc',
  imports: [CommonModule, FormsModule, Table, ApiTable, CodeBlock],
  templateUrl: './table-doc.html',
  styleUrl: './table-doc.css',
})
export class TableDoc {
  showCode = signal(false);
  playHoverable = signal(true);
  importCopied = signal(false);

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@email.com', status: 'Activo', rol: 'Admin' },
    { id: 2, nombre: 'Carlos López', email: 'carlos@email.com', status: 'Inactivo', rol: 'Editor' },
    { id: 3, nombre: 'María Fernández', email: 'maria@email.com', status: 'Activo', rol: 'Usuario' },
    { id: 4, nombre: 'Pedro Martínez', email: 'pedro@email.com', status: 'Activo', rol: 'Editor' },
    { id: 5, nombre: 'Laura Sánchez', email: 'laura@email.com', status: 'Inactivo', rol: 'Usuario' },
  ];

  cols = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Estado' },
    { key: 'rol', header: 'Rol' },
  ];

  produccionData = [
    { lote: 'L-001', producto: 'Widget A', cantidad: 150, fecha: '2026-06-01', estado: 'Completado' },
    { lote: 'L-002', producto: 'Widget B', cantidad: 200, fecha: '2026-06-02', estado: 'En proceso' },
    { lote: 'L-003', producto: 'Widget C', cantidad: 75, fecha: '2026-06-03', estado: 'Pendiente' },
    { lote: 'L-004', producto: 'Widget A', cantidad: 120, fecha: '2026-06-04', estado: 'Completado' },
  ];

  prodCols = [
    { key: 'lote', header: 'Lote', width: '90px' },
    { key: 'producto', header: 'Producto' },
    { key: 'cantidad', header: 'Cantidad', width: '100px' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'estado', header: 'Estado' },
  ];

  copyImport() {
    navigator.clipboard.writeText(`import { Table } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const parts = ['<dln-table'];
    parts.push(`\n  [data]="usuarios"`);
    const hover = this.playHoverable();
    if (!hover) {
      parts.push(`\n  [hoverable]="false"`);
    }
    parts.push(`\n  [columns]="cols"`);
    parts.push(`\n></dln-table>`);
    return parts.join('');
  });

  templateCellCode = `<dln-table [data]="usuarios" [columns]="cols">
  <ng-template #cellTemplate let-row let-colKey="key">
    @if (colKey === "status") {
      <span [class.status-active]="row['status'] === 'Activo'">
        {{ row['status'] }}
      </span>
    } @else {
      {{ row[colKey] }}
    }
  </ng-template>
</dln-table>`;

  useCaseUserCode = `<dln-table
  [data]="usuarios"
  [columns]="[
    { key: "id", header: "ID", width: "60px" },
    { key: "nombre", header: "Nombre" },
    { key: "email", header: "Email" },
    { key: "status", header: "Estado" },
    { key: "rol", header: "Rol" }
  ]">
</dln-table>`;

  inputProps: ApiTableRow[] = [
    { name: 'data', type: 'Record<string, any>[]', default: 'required', description: 'Arreglo de objetos a renderizar como filas.' },
    { name: 'columns', type: 'TableColumn[]', default: 'required', description: 'Configuración de columnas (key, header, width opcional).' },
    { name: 'hoverable', type: 'boolean', default: 'true', description: 'Habilita/deshabilita el efecto hover en filas.' },
  ];
}
