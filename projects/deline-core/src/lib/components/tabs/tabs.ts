import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'dln-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  labels = input.required<string[]>();
  activeIndex = model<number>(0);
  tabChange = output<number>();

  selectTab(index: number): void {
    this.activeIndex.set(index);
    this.tabChange.emit(index);
  }
}
