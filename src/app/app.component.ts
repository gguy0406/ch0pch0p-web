import { ChangeDetectionStrategy, Component, HostListener, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
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

  private _lastScrollTopValue: number = 0;
}
