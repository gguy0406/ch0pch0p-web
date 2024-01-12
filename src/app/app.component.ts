import { ChangeDetectionStrategy, Component, HostListener, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
})
export class AppComponent {
  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    this.isScrollingUp.set(!!this._lastScrollTopValue && scrollTop < this._lastScrollTopValue());
    this._lastScrollTopValue.set(scrollTop);
  }

  protected isScrollingUp: WritableSignal<boolean> = signal(false);
  private _lastScrollTopValue: WritableSignal<number> = signal(0);
}
