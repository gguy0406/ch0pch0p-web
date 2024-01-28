import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';

import { MemberTeam, TeamColor } from 'src/lib/types';

@Component({
  selector: 'app-member-intro',
  templateUrl: './member-intro.component.html',
  styleUrl: './member-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class MemberIntroComponent implements AfterViewInit {
  @ViewChild('memberImg', { static: true }) private _memberImg!: ElementRef;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) team!: keyof typeof MemberTeam;
  @Input({ required: true }) intro!: string;

  protected MemberTeam = MemberTeam;
  protected TeamColor = TeamColor;
  protected isIntersecting: WritableSignal<boolean> = signal(false);

  private _observer: IntersectionObserver = new IntersectionObserver(
    ([entry]) => {
      this.isIntersecting.set(entry.isIntersecting);
      entry.isIntersecting && this._observer.disconnect();
    },
    { threshold: 0.5 }
  );

  ngAfterViewInit(): void {
    this._observer.observe(this._memberImg.nativeElement);
  }
}
