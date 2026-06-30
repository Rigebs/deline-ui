import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastState = signal<ToastState>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  state = this.toastState.asReadonly();

  private timeoutId?: ReturnType<typeof setTimeout>;

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.toastState.set({ message, type, isVisible: true });

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.toastState.update((prev) => ({ ...prev, isVisible: false }));
  }
}
