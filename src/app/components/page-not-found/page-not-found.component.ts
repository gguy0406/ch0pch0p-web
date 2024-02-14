import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StickyNavComponent } from '../sticky-nav/sticky-nav.component';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StickyNavComponent],
})
export class PageNotFoundComponent {}
