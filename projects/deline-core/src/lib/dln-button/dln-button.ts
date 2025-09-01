import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dln-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dln-button.html',
  styleUrls: ['./dln-button.css'],
})
export class DlnButton {
  @Input() label?: string;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() variant: 'primary' | 'secondary' | 'accent' = 'primary';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
