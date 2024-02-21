import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './lucky-gacha.component.html',
  styleUrl: './lucky-gacha.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class LuckyGachaComponent {}
