import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';

import { ScreenSizeSignal } from '../signals/screen-size.signal';

@Directive({
  selector: '[appScreenSize]',
  standalone: true,
})
export class ScreenSizeDirective {
  @Output() screenChange = new EventEmitter();
  screenSize!: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private screenSizeSignal: ScreenSizeSignal,
  ) {}

  private setScreenSize() {
    const width = this.el.nativeElement.ownerDocument.defaultView.innerWidth;

    if (width < 600) {
      this.screenSize = 'small';
    } else if (width >= 600 && width < 1024) {
      this.screenSize = 'medium';
    } else {
      this.screenSize = 'large';
    }
    this.screenSizeSignal.currenScreenSize.set(this.screenSize);
  }
}
