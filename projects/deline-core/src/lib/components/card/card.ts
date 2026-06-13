import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'dln-card',
  host: {
    '[class.is-hoverable]': 'hoverable()',
    '[class.has-shadow]': 'shadow()',
    '[style.--card-padding]': 'padding()',
  },
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  padding = input<string>('1.5rem');
  hoverable = input<boolean>(false);
  shadow = input<boolean>(true);
}
