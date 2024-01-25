import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-c0',
  templateUrl: './c0.component.html',
  styleUrl: './c0.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class C0Component {}
