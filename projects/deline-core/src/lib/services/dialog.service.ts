import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  Type,
  ComponentRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from '../components/modal/modal';

export interface DialogConfig {
  title?: string;
  width?: string;
  height?: string;
  data?: unknown;
}

export interface DialogRef<T = unknown> {
  close: (result?: T) => void;
  afterClosed: () => Subject<T | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private openDialogs: ComponentRef<Modal>[] = [];

  /**
   * Abre un modal con un componente dinámico
   */
  open<T, R = unknown>(component: Type<T>, config: DialogConfig = {}): DialogRef<R> {
    const modalComponent = this.createModalComponent(component, config);
    const dialogRef = this.createDialogRef<R>(modalComponent);

    return dialogRef;
  }

  /**
   * Cierra todos los modales abiertos
   */
  closeAll(): void {
    this.openDialogs.forEach((ref) => this.destroyModal(ref));
  }

  private createModalComponent<T>(component: Type<T>, config: DialogConfig): ComponentRef<Modal> {
    // Crear el componente del contenido
    const contentRef = createComponent(component, {
      environmentInjector: this.injector,
    });

    // Crear el modal
    const modalRef = createComponent(Modal, {
      environmentInjector: this.injector,
      projectableNodes: [[contentRef.location.nativeElement]],
    });

    // Configurar el modal
    modalRef.setInput('isOpen', true);
    modalRef.setInput('title', config.title || '');

    // Aplicar estilos personalizados si hay
    if (config.width || config.height) {
      const dialogElement = modalRef.location.nativeElement.querySelector('dialog');
      if (dialogElement) {
        if (config.width) dialogElement.style.width = config.width;
        if (config.height) dialogElement.style.height = config.height;
      }
    }

    // Adjuntar al DOM
    document.body.appendChild(modalRef.location.nativeElement);
    this.appRef.attachView(modalRef.hostView);
    this.appRef.attachView(contentRef.hostView);

    this.openDialogs.push(modalRef);

    return modalRef;
  }

  private createDialogRef<R>(modalRef: ComponentRef<Modal>): DialogRef<R> {
    const afterClosedSubject = new Subject<R | undefined>();

    const close = (result?: R) => {
      modalRef.setInput('isOpen', false);

      // Esperar la animación antes de destruir
      setTimeout(() => {
        afterClosedSubject.next(result);
        afterClosedSubject.complete();
        this.destroyModal(modalRef);
      }, 300);
    };

    // Escuchar el evento closed del modal
    modalRef.instance.closed.subscribe(() => {
      close();
    });

    return {
      close,
      afterClosed: () => afterClosedSubject,
    };
  }

  private destroyModal(modalRef: ComponentRef<Modal>): void {
    const index = this.openDialogs.indexOf(modalRef);
    if (index > -1) {
      this.openDialogs.splice(index, 1);
    }

    this.appRef.detachView(modalRef.hostView);
    modalRef.destroy();
  }
}
