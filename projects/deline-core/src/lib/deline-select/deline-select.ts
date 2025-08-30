import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'deline-select',
  imports: [CommonModule],
  templateUrl: './deline-select.html',
  styleUrl: './deline-select.css',
})
export class DelineSelect {
  @Input() options: string[] = [];
  @Input() disabled = false;
}
