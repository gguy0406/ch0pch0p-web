import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  WritableSignal,
  signal,
} from '@angular/core';

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
  @HostBinding('class.-top-full') get hiddenNav() {
    return !this.isScrollingUp();
  }
  @HostBinding('class.top-0') get showNav() {
    return this.isScrollingUp();
  }

  protected isScrollingUp: WritableSignal<boolean> = signal(false);

  private _lastScrollTopValue: number = 0;

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.parentElement?.addEventListener('scroll', (event) => {
      const scrollTop = (event.target as HTMLDivElement).scrollTop;
      this.isScrollingUp.set(scrollTop < this._lastScrollTopValue);
      this._lastScrollTopValue = scrollTop;
    });
  }
}
