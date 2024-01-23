import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { BUY_CH0PCH0P_URL, ROUTE } from 'src/lib/constants';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, NgOptimizedImage, RouterModule],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly ROUTE = ROUTE;
  protected readonly BUY_CH0PCH0P_URL = BUY_CH0PCH0P_URL;
}
