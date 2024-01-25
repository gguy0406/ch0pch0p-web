import { ChangeDetectionStrategy, Component, HostListener, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';
import { StickyNavComponent } from '../sticky-nav/sticky-nav.component';

@Component({
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, FooterComponent, StickyNavComponent],
})
export class PageLayoutComponent {
  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    this.isScrollingUp.set(!!this._lastScrollTopValue && scrollTop < this._lastScrollTopValue);
    this._lastScrollTopValue = scrollTop;
  }

  protected isScrollingUp: WritableSignal<boolean> = signal(false);

  private _lastScrollTopValue: number = 0;
}
