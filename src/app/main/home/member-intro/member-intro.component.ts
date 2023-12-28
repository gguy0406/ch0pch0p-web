import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  numberAttribute,
} from '@angular/core';
import { MemberTeam } from 'src/lib/types';

@Component({
  selector: 'app-member-intro',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './member-intro.component.html',
  styleUrl: './member-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberIntroComponent {
  @Input({ required: true }) public name!: string;
  @Input({ required: true }) public team!: keyof typeof MemberTeam;
  @Input({ required: true }) public intro!: string;
  @Input({ transform: numberAttribute }) public offsetAnimation?: number;

  protected MemberTeam = MemberTeam;
  protected isIntersecting?: boolean;

  private observer: IntersectionObserver = new IntersectionObserver(
    ([entry]) => {
      setTimeout(() => {
        this.isIntersecting = entry.isIntersecting;
        this._cdRef.detectChanges();
      }, this.offsetAnimation);

      entry.isIntersecting && this.observer.disconnect();
    },
    { threshold: 1.0 }
  );

  constructor(
    elementRef: ElementRef,
    private _cdRef: ChangeDetectorRef
  ) {
    this.observer.observe(elementRef.nativeElement);
  }
}
