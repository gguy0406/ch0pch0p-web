import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

import { STMachine } from '@lib/types';
import { LuckyGachaService } from '@services/lucky-gacha.service';

@Component({
  templateUrl: './st-machine.component.html',
  styleUrl: './st-machine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, NgTemplateOutlet],
})
export class STMachineComponent {
  protected readonly ST_MACHINE = STMachine;
  protected machine: WritableSignal<STMachine>;
  protected prizeLeft: number | undefined;

  constructor(
    route: ActivatedRoute,
    protected luckyGachaService: LuckyGachaService
  ) {
    this.machine = signal(route.snapshot.params['machine']);
  }
}
