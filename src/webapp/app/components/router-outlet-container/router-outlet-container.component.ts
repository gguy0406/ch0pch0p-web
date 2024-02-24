import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './router-outlet-container.component.html',
  styleUrl: './router-outlet-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule],
})
export class RouterOutletContainerComponent {}
