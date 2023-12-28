import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('unveil', [
      state('unveiled', style({ display: 'none' })),
      transition(
        'covered => unveiled',
        animate(
          '1s',
          keyframes([
            style({ offset: 0 }),
            style({ transform: 'rotate(-2deg)', offset: 0.1 }),
            style({ transform: 'rotate(50deg)', offset: 0.4 }),
            style({ transform: 'rotate(28deg)', offset: 0.6 }),
            style({ transform: 'rotate(36deg) translate(300px, 300px)', offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class HomeComponent {
  @HostListener('window:scroll', []) onWindowScroll() {
    this.scroll = Math.min(window.scrollY / (2968 - window.innerHeight), 1);
  }
  @HostBinding('style.--scroll') protected scroll: number = 0;

  protected array = Array;
  protected isUnveiled!: boolean;

  protected getGridItemClass(idx: number) {
    return {
      '!border-t-0': idx < 9,
      '!border-r-0': (idx + 1) % 9 === 0,
      '!border-l-0': idx % 9 === 0,
    };
  }
}
