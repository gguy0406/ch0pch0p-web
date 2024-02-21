import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ThreeDSlideShowComponent } from 'src/app/components/thee-d-slide-show/three-d-slide-show.component';
import { CONTRACT_ADDRESS } from 'src/lib/constants';
import { getMarketplaceUrl } from 'src/lib/helpers';

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
