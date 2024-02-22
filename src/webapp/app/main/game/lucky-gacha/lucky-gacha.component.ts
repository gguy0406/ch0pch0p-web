import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { STMachine } from '@lib/types';

import { LuckyGachaService, Machines } from './lucky-gacha.service';

@Component({
  templateUrl: './lucky-gacha.component.html',
  styleUrl: './lucky-gacha.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  providers: [LuckyGachaService],
})
export class LuckyGachaComponent implements OnInit {
  protected readonly ST_MACHINE = STMachine;
  protected machines?: Record<STMachine, Machines[number]>;

  constructor(
    private _destroyRef: DestroyRef,
    private _luckGachaService: LuckyGachaService
  ) {}

  ngOnInit(): void {
    this._luckGachaService
      .getMachinesStatus()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (machines) =>
          (this.machines = machines.reduce(
            (map, machine) => {
              map![machine.id] = machine;

              return map;
            },
            {} as typeof this.machines
          ))
      );
  }
}
