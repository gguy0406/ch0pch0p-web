import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { filter, finalize, mergeMap } from 'rxjs/operators';

import { EVENT_ATTENDANCE_ADDRESSES, MAXIMUM_GAME_TURN_PER_DAY } from 'environments/environment';

import { LuckyGachaService } from '@services/lucky-gacha.service';
import { WalletService } from '@services/wallet.service';

import { NftPoolService } from './nft-pool.service';

@Component({
  templateUrl: './np-machine.component.html',
  styleUrl: './np-machine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ClipboardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    NgOptimizedImage,
    NgTemplateOutlet,
  ],
  providers: [NftPoolService],
})
export class NPMachineComponent {
  @HostBinding('style.background') get background() {
    return `url('/assets/game/cnc/${this.raffleResult() ? 'bg-result.png' : 'bg-cnc.png'}') center / cover`;
  }

  protected readonly MAXIMUM_GAME_TURN_PER_DAY = MAXIMUM_GAME_TURN_PER_DAY;
  protected turnCount: WritableSignal<number> = signal(MAXIMUM_GAME_TURN_PER_DAY);
  protected isRaffling: WritableSignal<boolean> = signal(false);
  protected raffleResult: WritableSignal<
    { name: string; imgType: 'image' | 'animated_image'; imgSrc: string; txHash: string } | undefined
  > = signal(undefined);
  protected cannotPlay: Signal<boolean> = computed(
    () =>
      (!!this.walletService.key() && !EVENT_ATTENDANCE_ADDRESSES.includes(this.walletService.key()!.bech32Address)) ||
      this.turnCount() >= MAXIMUM_GAME_TURN_PER_DAY ||
      this.isRaffling()
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

      this.turnCount.set(MAXIMUM_GAME_TURN_PER_DAY);

      this._luckyGachaService
        .getTurnCount(this.walletService.key()!.bech32Address)
        .pipe(takeUntilDestroyed())
        .subscribe((turnCount) => this.turnCount.set(turnCount));
    });
  }

  protected play() {
    this.isRaffling.set(true);
    this._nftPoolService
      .play(this.walletService.key()!.bech32Address)
      .pipe(
        filter((prize) => {
          !prize && this.showUniverseMessage();

          return !!prize;
        }),
        mergeMap((prize) => this._nftPoolService.getTokenInfo(prize!.contract, prize!.tokenId, prize!.txHash)),
        finalize(() => {
          this.isRaffling.set(false);
          this.turnCount.update((value) => ++value);
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (result) => {
          this.raffleResult.set({
            name: result.token.name,
            imgType: result.token.media.visualAssets.lg.type,
            imgSrc: result.token.media.visualAssets.lg.url,
            txHash: result.txHash,
          });
        },
        error: () => this.showUniverseMessage(),
      });
  }

  private showUniverseMessage() {
    const messageNo = Math.ceil(Math.random() * 42) || 1;

    this.raffleResult.set({ imgSrc: `assets/game/cnc/msg-${messageNo}.png`, imgType: 'image', name: '', txHash: '' });
  }
}
