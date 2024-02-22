import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from '@components/footer';
import { NavComponent } from '@components/nav';
import { StickyNavComponent } from '@components/sticky-nav';
import { ThreeDSlideShowComponent } from '@components/thee-d-slide-show';
import { DragToScrollDirective } from '@directives/drag-to-scroll';
import { BUY_CH0PCH0P_URL } from '@lib/constants';

import { MemberIntroComponent } from './member-intro/member-intro.component';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    FooterComponent,
    MemberIntroComponent,
    NavComponent,
    StickyNavComponent,
    ThreeDSlideShowComponent,
    DragToScrollDirective,
  ],
})
export class HomeComponent {
  protected readonly BUY_CH0PCH0P_URL = BUY_CH0PCH0P_URL;
  protected isUnveiled: WritableSignal<boolean> = signal(false);
  protected section1progress: WritableSignal<number> = signal(0);
  protected array = Array;

  protected onSection1Scroll(event: Event) {
    const section1: HTMLDivElement = event.target as HTMLDivElement;
    this.section1progress.set(Math.min((section1.scrollTop + 1) / section1.clientHeight, 1));
  }
}
