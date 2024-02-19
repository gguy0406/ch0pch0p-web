import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DISCORD_URL, X_URL } from 'src/lib/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class FooterComponent {
  protected readonly DISCORD_URL = DISCORD_URL;
  protected readonly X_URL = X_URL;
}
