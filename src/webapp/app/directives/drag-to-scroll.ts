import { Directive, ElementRef, HostBinding, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';

@Directive({
  selector: '[appDragToScroll]',
  standalone: true,
})
export class DragToScrollDirective implements OnInit, OnDestroy {
  @HostBinding('style.cursor') get cursorStyle() {
    return this._cursorStyle();
  }
  @HostBinding('class') get classes() {
    return 'select-none pointer-events-none-container';
  }

  private _pos = { top: 0, left: 0, x: 0, y: 0 };
  private _nativeElement: HTMLElement;
  private _cursorStyle: WritableSignal<string> = signal('grab');
  private _handleMouseDown = (event: MouseEvent) => {
    Object.assign(this._pos, {
      left: this._nativeElement.scrollLeft,
      top: this._nativeElement.scrollTop,
      x: event.clientX,
      y: event.clientY,
    });

    this._cursorStyle.set('grabbing');
    this._nativeElement.addEventListener('mousemove', this._handleMouseMove);
    this._nativeElement.addEventListener('mouseup', this._handleMouseUpOrLeave);
    this._nativeElement.addEventListener('mouseleave', this._handleMouseUpOrLeave);
  };
  private _handleMouseMove = (event: MouseEvent) => {
    const dx = event.clientX - this._pos.x;
    const dy = event.clientY - this._pos.y;

    this._nativeElement.scrollTop = this._pos.top - dy;
    this._nativeElement.scrollLeft = this._pos.left - dx;
  };
  private _handleMouseUpOrLeave = () => {
    this._cursorStyle.set('grab');
    this._nativeElement.removeEventListener('mousemove', this._handleMouseMove);
    this._nativeElement.removeEventListener('mouseup', this._handleMouseUpOrLeave);
    this._nativeElement.removeEventListener('mouseleave', this._handleMouseUpOrLeave);
  };

  constructor(_elementRef: ElementRef) {
    this._nativeElement = _elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._nativeElement.addEventListener('mousedown', this._handleMouseDown);
  }

  ngOnDestroy(): void {
    this._nativeElement.removeEventListener('mousedown', this._handleMouseDown);
  }
}
