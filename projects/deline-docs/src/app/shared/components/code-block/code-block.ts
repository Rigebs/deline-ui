import { Component, input, viewChild, ElementRef, effect } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.html',
})
export class CodeBlock {
  code = input.required<string>();
  language = input<string>('html');

  copied = false;

  codeEl = viewChild<ElementRef<HTMLElement>>('codeEl');

  constructor() {
    effect(() => {
      const code = this.code();
      const el = this.codeEl();
      if (el && code) {
        el.nativeElement.textContent = code;
        hljs.highlightElement(el.nativeElement);
      }
    });
  }

  copy() {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
