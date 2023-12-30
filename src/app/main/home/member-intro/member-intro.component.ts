import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
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
export class MemberIntroComponent implements AfterViewInit {
  @ViewChild('memberImg', { static: true }) private _memberImg!: ElementRef;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) team!: keyof typeof MemberTeam;
  @Input({ required: true }) intro!: string;
  @Input({ transform: numberAttribute }) offsetAnimation?: number;

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
    { threshold: 0.5 }
  );

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.observer.observe(this._memberImg.nativeElement);
  }
}
