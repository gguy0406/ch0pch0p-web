import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import { BUY_CH0PCH0P_URL, ROUTE } from 'src/lib/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, NgOptimizedImage, RouterModule],
})
export class NavComponent {
  protected readonly ROUTE = ROUTE;
  protected readonly BUY_CH0PCH0P_URL = BUY_CH0PCH0P_URL;
  protected currentUrl: WritableSignal<string> = signal('');
  protected matchRouteSignals: { [k in (typeof ROUTE)[keyof typeof ROUTE]]: Signal<boolean> } = Object.fromEntries(
    Object.values(ROUTE).map((value) => [value, computed(() => this.currentUrl() === '/' + value)])
  ) as { [k in (typeof ROUTE)[keyof typeof ROUTE]]: Signal<boolean> };

  constructor(router: Router) {
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set(decodeURI((e as NavigationEnd).url)));
  }
}
