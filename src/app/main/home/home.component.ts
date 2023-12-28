import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MemberIntroComponent } from './member-intro/member-intro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MemberIntroComponent, NgOptimizedImage],
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
  // section 1 animation
  protected isUnveiled!: boolean;
  protected scroll: number = 0;
  protected array = Array;

  protected onSection1Scroll(event: Event) {
    const section1: HTMLDivElement = event.target as HTMLDivElement;
    this.scroll = section1.scrollTop / (section1.scrollHeight - section1.clientHeight);
  }

  protected getGridItemClass(idx: number) {
    return {
      '!border-t-0': idx < 9,
      '!border-r-0': (idx + 1) % 9 === 0,
      '!border-l-0': idx % 9 === 0,
    };
  }
}
