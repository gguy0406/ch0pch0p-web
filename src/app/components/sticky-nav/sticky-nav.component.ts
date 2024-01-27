import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Signal,
  WritableSignal,
  computed,
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
export class StickyNavComponent implements AfterViewInit, OnDestroy {
  @HostBinding('style.top.px') get topPosition() {
    return this._topPosition();
  }

  private _lastScrollTopValue: number = 0;
  private _isScrollingUp: WritableSignal<boolean> = signal(false);
  private _topPosition: Signal<string> = computed(() =>
    this._isScrollingUp() ? '0' : `-${this._elementRef.nativeElement.clientHeight}`
  );
  private _handleScrollEvent = (event: HTMLElementEventMap['scroll']) => {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    this._isScrollingUp.set(scrollTop < this._lastScrollTopValue);
    this._lastScrollTopValue = scrollTop;
  };

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.parentElement?.addEventListener('scroll', this._handleScrollEvent);
  }

  ngOnDestroy(): void {
    this._elementRef.nativeElement.parentElement?.removeEventListener('scroll', this._handleScrollEvent);
  }
}
