import { Component, Input } from '@angular/core';

@Component({
  selector: 'deline-input',
  imports: [],
  templateUrl: './deline-input.html',
  styleUrl: './deline-input.css',
})
export class DelineInput {
  @Input() placeholder = 'Type here...';
  @Input() disabled = false;
}
