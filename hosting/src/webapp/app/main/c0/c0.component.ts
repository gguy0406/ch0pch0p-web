import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CONTRACT_ADDRESS } from 'environments/environment';

import { ThreeDSlideShowComponent } from '@components/thee-d-slide-show';
import { getMarketplaceUrl } from '@lib/helpers';

@Component({
  templateUrl: './c0.component.html',
  styleUrl: './c0.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, ThreeDSlideShowComponent],
})
export class C0Component {
  protected readonly CO_URL = getMarketplaceUrl(CONTRACT_ADDRESS.C0_SG721);
}
