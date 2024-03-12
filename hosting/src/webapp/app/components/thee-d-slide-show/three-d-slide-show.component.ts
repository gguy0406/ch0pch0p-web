import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-three-d-slide-show',
  templateUrl: './three-d-slide-show.component.html',
  styleUrl: './three-d-slide-show.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ThreeDSlideShowComponent {
  @Input({ required: true }) srcFolder!: string;

  protected array = Array;
}
