import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'deline-icons';

@Component({
  selector: 'dln-stepper',
  imports: [CommonModule, IconComponent],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper {
  steps = input.required<string[]>();
  currentStep = input<number>(0);

  getStepState(index: number) {
    if (index < this.currentStep()) return 'is-completed';
    if (index === this.currentStep()) return 'is-active';
    return 'is-pending';
  }
}
