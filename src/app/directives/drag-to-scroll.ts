import { Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '[appDragToScroll]',
  standalone: true,
})
export class DragToScrollDirective {
  private _nativeElement: HTMLElement;
  private _pos = { top: 0, left: 0, x: 0, y: 0 };

  constructor(_elementRef: ElementRef, ngZone: NgZone) {
    this._nativeElement = _elementRef.nativeElement;
    this._nativeElement.style.cursor = 'grab';

    ngZone.runOutsideAngular(() => {
      this._nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
        this._nativeElement.style.cursor = 'grabbing';
        this._nativeElement.classList.add('undraggable-container');

        Object.assign(this._pos, {
          left: this._nativeElement.scrollLeft,
          top: this._nativeElement.scrollTop,
          x: event.clientX,
          y: event.clientY,
        });

        const handleMouseMove = (event: MouseEvent) => {
          const dx = event.clientX - this._pos.x;
          const dy = event.clientY - this._pos.y;

          this._nativeElement.scrollTop = this._pos.top - dy;
          this._nativeElement.scrollLeft = this._pos.left - dx;
        };

        const handleMouseUpOrLeave = () => {
          this._nativeElement.removeEventListener('mousemove', handleMouseMove);
          this._nativeElement.removeEventListener('mouseup', handleMouseUpOrLeave);
          this._nativeElement.removeEventListener('mouseleave', handleMouseUpOrLeave);

          this._nativeElement.style.cursor = 'grab';
          this._nativeElement.classList.remove('undraggable-container');
        };

        this._nativeElement.addEventListener('mousemove', handleMouseMove);
        this._nativeElement.addEventListener('mouseup', handleMouseUpOrLeave);
        this._nativeElement.addEventListener('mouseleave', handleMouseUpOrLeave);
      });
    });
  }
}
