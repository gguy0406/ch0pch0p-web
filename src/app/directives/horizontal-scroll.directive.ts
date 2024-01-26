import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true,
})
export class HorizontalScrollDirective {
  @HostListener('wheel', ['$event']) onWheel(event: WheelEvent) {
    if (
      (event.deltaY > 0 &&
        this._nativeElement.scrollLeft >= this._nativeElement.scrollWidth - this._nativeElement.clientWidth) ||
      (event.deltaY < 0 && this._nativeElement.scrollLeft === 0)
    )
      return;

    event.preventDefault();

    this._nativeElement.scrollBy({ left: event.deltaY * 1.35, behavior: 'smooth' });
  }

  private _nativeElement: HTMLElement;

  constructor(_elementRef: ElementRef) {
    this._nativeElement = _elementRef.nativeElement;
  }
}
