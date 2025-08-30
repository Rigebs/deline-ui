import { Component, Input } from '@angular/core';

@Component({
  selector: 'deline-button',
  imports: [],
  templateUrl: './deline-button.html',
  styleUrl: './deline-button.css',
})
export class DelineButton {
  @Input() label = 'Button';
  @Input() disabled = false;
}
