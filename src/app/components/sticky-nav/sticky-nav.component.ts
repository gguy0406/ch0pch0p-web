import { ChangeDetectionStrategy, Component, HostBinding, Input, booleanAttribute } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrl: './sticky-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavComponent],
})
export class StickyNavComponent {
  @HostBinding('class.--active')
  @Input({ required: true, transform: booleanAttribute })
  isActive!: boolean;
}
