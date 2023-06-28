import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShadowCard]',
})
export class ShadowCardDirective {
  constructor(private elementRef: ElementRef) {}

  @Input('appShadowCard') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }
}
