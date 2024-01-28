import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class PageNotFoundComponent {}
