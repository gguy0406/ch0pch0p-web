import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';

import { FooterComponent } from '../footer';
import { StickyNavComponent } from '../sticky-nav';

@Component({
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, FooterComponent, StickyNavComponent],
})
export class PageLayoutComponent {
  protected usePageMargin: WritableSignal<boolean> = signal(false);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        mergeMap(() => (this._activatedRoute.firstChild || this._activatedRoute).data),
        takeUntilDestroyed()
      )
      .subscribe((data) => this.usePageMargin.set(!!data['usePageMargin']));
  }
}
