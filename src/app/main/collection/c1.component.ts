import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThreeDSlideShowComponent } from 'src/app/components/thee-d-slide-show/three-d-slide-show.component';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrl: './c1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ThreeDSlideShowComponent],
})
export class C1Component {}
