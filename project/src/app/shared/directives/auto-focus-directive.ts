import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  private el = inject(ElementRef);

  @Input('appAutoFocus') shouldFocus: boolean = true;

  ngAfterViewInit() {
    if (this.shouldFocus) {
      setTimeout(() => this.el.nativeElement.focus());
    }
  }
}
