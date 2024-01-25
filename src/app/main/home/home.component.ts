import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { StickyNavComponent } from 'src/app/components/sticky-nav/sticky-nav.component';
import { ThreeDSlideShowComponent } from 'src/app/components/thee-d-slide-show/three-d-slide-show.component';
import { BUY_CH0PCH0P_URL } from 'src/lib/constants';
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
    NgOptimizedImage,
  ],
})
export class HomeComponent {
  protected readonly BUY_CH0PCH0P_URL = BUY_CH0PCH0P_URL;
  protected isUnveiled: WritableSignal<boolean> = signal(false);
  protected section1progress: WritableSignal<number> = signal(0);
  protected array = Array;

  protected onSection1Scroll(event: Event) {
    const section1: HTMLDivElement = event.target as HTMLDivElement;
    this.section1progress.set(Math.min(section1.scrollTop / section1.clientHeight, 1));
  }
}
