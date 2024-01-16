import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MemberTeam, TeamColor } from 'src/lib/types';

@Component({
  selector: 'app-member-intro',
  templateUrl: './member-intro.component.html',
  styleUrl: './member-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgOptimizedImage],
})
export class MemberIntroComponent implements AfterViewInit {
  @ViewChild('memberImg', { static: true }) private _memberImg!: ElementRef;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) team!: keyof typeof MemberTeam;
  @Input({ required: true }) intro!: string;

  offsetAnimation?: number;

  protected MemberTeam = MemberTeam;
  protected TeamColor = TeamColor;
  protected isIntersecting?: boolean;

  private observer: IntersectionObserver = new IntersectionObserver(
    ([entry]) => {
      setTimeout(
        () => {
          this.isIntersecting = entry.isIntersecting;
          this._cdRef.detectChanges();
        },
        (this.offsetAnimation || 0) * 125
      );

      entry.isIntersecting && this.observer.disconnect();
    },
    { threshold: 0.5 }
  );

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.observer.observe(this._memberImg.nativeElement);
    this.offsetAnimation = +window
      .getComputedStyle(this._elementRef.nativeElement)
      .getPropertyValue('--offset-animation');
  }
}
