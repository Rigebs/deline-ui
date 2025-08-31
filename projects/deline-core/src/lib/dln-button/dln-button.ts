import { Component, Input } from '@angular/core';

@Component({
  selector: 'dln-button',
  standalone: true,
  templateUrl: './dln-button.html',
  styleUrl: './dln-button.css',
})
export class DlnButton {
  @Input() label?: string;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
}
