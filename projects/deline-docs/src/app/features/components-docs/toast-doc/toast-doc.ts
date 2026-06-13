import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService, Toast, Button } from 'deline-core';
import { ApiTable, ApiTableRow } from '../../../shared/components/api-table/api-table';
import { CodeBlock } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-toast-doc',
  imports: [CommonModule, FormsModule, Button, Toast, ApiTable, CodeBlock],
  templateUrl: './toast-doc.html',
  styleUrl: './toast-doc.css',
})
export class ToastDoc {
  private toastService = inject(ToastService);

  message = signal('Operación completada exitosamente');
  selectedType = signal<'success' | 'error' | 'info'>('success');
  duration = signal(3000);

  showCode = signal(false);
  importCopied = signal(false);

  showToast() {
    this.toastService.show(this.message(), this.selectedType(), this.duration());
  }

  showSuccess() {
    this.toastService.show('Operación exitosa', 'success', 4000);
  }

  showError() {
    this.toastService.show('Error al procesar la solicitud', 'error', 4000);
  }

  showInfo() {
    this.toastService.show('Información actualizada', 'info', 4000);
  }

  copyImport() {
    navigator.clipboard.writeText(`import { ToastService } from 'deline-core';`).then(() => {
      this.importCopied.set(true);
      setTimeout(() => this.importCopied.set(false), 2000);
    });
  }

  genCode = computed(() => {
    const msg = this.message();
    const type = this.selectedType();
    const dur = this.duration();
    return `this.toastService.show('${msg}', '${type}', ${dur});`;
  });

  apiRows: ApiTableRow[] = [
    { name: 'show(message, type, duration)', type: "void", default: "type: 'info', duration: 3000", description: 'Muestra un toast con el mensaje, tipo y duración especificados.' },
    { name: 'hide()', type: "void", default: "-", description: 'Oculta el toast actual de forma inmediata.' },
    { name: 'state', type: "Signal<ToastState>", default: "-", description: 'Señal de solo lectura con el estado actual { message, type, isVisible }.' },
  ];
}
