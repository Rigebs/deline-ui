import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dln-card',
  imports: [CommonModule],
  templateUrl: './dln-card.html',
  styleUrl: './dln-card.css',
})
export class DlnCard {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() shadow: 'sm' | 'md' | 'lg' = 'md';
  @Input() border: boolean = true;
}
