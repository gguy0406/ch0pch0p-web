import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ROUTE } from '@lib/constants';

@Component({
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, RouterModule],
})
export class SelectGameComponent {
  protected readonly ROUTE = ROUTE;
}
