import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrl: './sticky-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavComponent],
})
export class StickyNavComponent implements AfterViewInit {
  private _lastScrollTopValue: number = 0;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this._elementRef.nativeElement.parentElement?.addEventListener('scroll', (event) => {
        const scrollTop = (event.target as HTMLDivElement).scrollTop;
        this._elementRef.nativeElement.style.top =
          scrollTop < this._lastScrollTopValue ? '0' : `-${this._elementRef.nativeElement.clientHeight}px`;
        this._lastScrollTopValue = scrollTop;
      });
    });
  }
}
