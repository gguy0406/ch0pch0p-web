import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ThreeDSlideShowComponent } from 'src/app/components/thee-d-slide-show/three-d-slide-show.component';
import { MemberIntroComponent } from './member-intro/member-intro.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MemberIntroComponent,
    NavComponent,
    NgOptimizedImage,
    ThreeDSlideShowComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected isUnveiled: WritableSignal<boolean> = signal(false);
  protected section1progress: WritableSignal<number> = signal(0);
  protected array = Array;

  protected onSection1Scroll(event: Event) {
    const section1: HTMLDivElement = event.target as HTMLDivElement;
    this.section1progress.set(Math.min(section1.scrollTop / section1.clientHeight, 1));
  }
}
