import { ChangeDetectionStrategy, Component, HostListener, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    this.isScrollingUp.set(!!this._lastScrollTopValue && scrollTop < this._lastScrollTopValue);
    this._lastScrollTopValue = scrollTop;
  }

  protected isScrollingUp: WritableSignal<boolean> = signal(false);
  protected currentUrl: WritableSignal<string> = signal('/');

  private _lastScrollTopValue: number = 0;

  constructor(router: Router) {
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set((e as NavigationEnd).url));
  }
}
