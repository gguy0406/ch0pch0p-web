import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { MachineStatus, NPMachine, STMachine } from '@lib/types';
import { LuckyGachaService, MachineMap } from '@services/lucky-gacha.service';
import { DialogHowToPlayComponent } from './dialog-how-to-play/dialog-how-to-play.component';

@Component({
  templateUrl: './lucky-gacha.component.html',
  styleUrl: './lucky-gacha.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, NgTemplateOutlet, RouterModule],
})
export class LuckyGachaComponent implements OnInit {
  protected readonly MACHINE_STATUS = MachineStatus;
  protected readonly NP_MACHINE = NPMachine;
  protected readonly ST_MACHINE = STMachine;
  protected machines: WritableSignal<MachineMap | undefined> = signal(undefined);

  constructor(
    protected luckGachaService: LuckyGachaService,
    private _destroyRef: DestroyRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.luckGachaService
      .getMachinesStatus()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((machines) => this.machines.set(machines));
  }

  openDialogHowToPlay() {
    this._dialog.open(DialogHowToPlayComponent, {
      width: '976px',
      backdropClass: ['bg-app', '!opacity-90'],
      panelClass: 'rounded-[50px]',
    });
  }
}
