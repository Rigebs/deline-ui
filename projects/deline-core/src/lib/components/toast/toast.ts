import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-toast',
  imports: [IconComponent],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private toastService = inject(ToastService);
  state = this.toastService.state;

  close(): void {
    this.toastService.hide();
  }
}
