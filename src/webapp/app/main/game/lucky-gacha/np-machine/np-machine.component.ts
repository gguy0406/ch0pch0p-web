import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs/operators';

import { EVENT_ATTENDANCE_ADDRESSES } from 'environments/environment';

import { LuckyGachaService } from '@services/lucky-gacha.service';
import { WalletService } from '@services/wallet.service';

import { NftPoolService } from './nft-pool.service';

@Component({
  templateUrl: './np-machine.component.html',
  styleUrl: './np-machine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, NgTemplateOutlet],
  providers: [NftPoolService],
})
export class NPMachineComponent {
  protected prizeLeft: number | undefined;
  protected turnCount: WritableSignal<number> = signal(0);
  protected isRaffling: WritableSignal<boolean> = signal(false);
  protected raffleResult: WritableSignal<
    { name: string; imgSrc: string; txHash: string } | { imgSrc: string } | undefined
  > = signal(undefined);
  protected cannotPlay: Signal<boolean> = computed(
    () =>
      !!this.walletService.key() &&
      !EVENT_ATTENDANCE_ADDRESSES.includes(this.walletService.key()!.bech32Address) &&
      !this.isRaffling()
  );

  constructor(
    protected walletService: WalletService,
    private _destroyRef: DestroyRef,
    private _luckyGachaService: LuckyGachaService,
    private _nftPoolService: NftPoolService
  ) {
    effect(() => {
      const address = this.walletService.key()?.bech32Address;

      if (!address) return;

      this._luckyGachaService
        .getTurnCount(this.walletService.key()!.bech32Address)
        .subscribe((turnCount) => this.turnCount.set(turnCount));
    });
  }

  protected play() {
    this.isRaffling.set(true);
    this._nftPoolService
      .play(this.walletService.key()!.bech32Address)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isRaffling.set(false))
      )
      .subscribe((prize) => {
        if (prize) {
          // this.raffleResult.set({});
          return;
        }

        // this.raffleResult.set({});
      });
  }
}
