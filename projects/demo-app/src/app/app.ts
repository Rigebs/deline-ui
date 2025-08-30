import { Component, signal } from '@angular/core';
import { DelineButton, DelineInput, DelineSelect } from 'deline-core';

@Component({
  selector: 'app-root',
  imports: [DelineButton, DelineInput, DelineSelect],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo-app');
}
