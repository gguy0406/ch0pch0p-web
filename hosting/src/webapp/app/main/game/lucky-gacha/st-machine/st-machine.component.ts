import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MAXIMUM_GAME_TURN_PER_DAY } from 'environments/environment';

import { STMachine } from '@lib/types';
import { LuckyGachaService, Machine } from '@services/lucky-gacha.service';
import { WalletService } from '@services/wallet.service';

import { SwappableTraitsService } from '../../swappable-traits.service';

@Component({
  templateUrl: './st-machine.component.html',
  styleUrl: './st-machine.component.scss',
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
  providers: [SwappableTraitsService],
})
export class STMachineComponent {
  protected readonly MAXIMUM_GAME_TURN_PER_DAY = MAXIMUM_GAME_TURN_PER_DAY;
  protected machine: Signal<Machine>;
  protected isEligible: WritableSignal<boolean> = signal(false);
  protected turnCount: WritableSignal<number> = signal(MAXIMUM_GAME_TURN_PER_DAY);
  protected isRaffling: WritableSignal<boolean> = signal(false);
  protected raffleResult: WritableSignal<
    { name: string; imgType: 'image' | 'animated_image'; imgSrc: string; txHash: string } | undefined
  > = signal(undefined);
  protected cannotPlay: Signal<boolean> = computed(
    () => !this.isEligible() || this.turnCount() >= MAXIMUM_GAME_TURN_PER_DAY || this.isRaffling()
  );

  constructor(
    route: ActivatedRoute,
    protected walletService: WalletService,
    private _destroyRef: DestroyRef,
    private _luckyGachaService: LuckyGachaService,
    private _swappableTraitsService: SwappableTraitsService
  ) {
    this.machine = signal(this._luckyGachaService.machines![route.snapshot.paramMap.get('machine') as STMachine]);

    this.walletService.keyChange$.pipe(takeUntilDestroyed()).subscribe(() => {
      const address = this.walletService.key()?.bech32Address;

      if (!address) return;

      this.turnCount.set(MAXIMUM_GAME_TURN_PER_DAY);
      this.isEligible.set(false);

      this._luckyGachaService
        .getTurnCount(this.walletService.key()!.bech32Address)
        .pipe(takeUntilDestroyed())
        .subscribe((turnCount) => this.turnCount.set(turnCount));

      this._swappableTraitsService
        .checkEligible(this.machine().id as STMachine, this.walletService.key()!.bech32Address)
        .pipe(takeUntilDestroyed())
        .subscribe((isEligible) => this.isEligible.set(isEligible));
    });
  }

  protected play() {
    this.isRaffling.set(true);

    // this._swappableTraitsService
    //   .play(this.walletService.key()!.bech32Address)
    //   .pipe(
    //     filter((prize) => {
    //       !prize && this.showUniverseMessage();

    //       return !!prize;
    //     }),
    //     mergeMap((prize) => this._nftPoolService.getTokenInfo(prize!.contract, prize!.tokenId, prize!.txHash)),
    //     finalize(() => {
    //       this.isRaffling.set(false);
    //       this.turnCount.update((value) => ++value);
    //     }),
    //     takeUntilDestroyed(this._destroyRef)
    //   )
    //   .subscribe({
    //     next: (result) => {
    //       this.raffleResult.set({
    //         name: result.token.name,
    //         imgType: result.token.media.visualAssets.lg.type,
    //         imgSrc: result.token.media.visualAssets.lg.url,
    //         txHash: result.txHash,
    //       });
    //     },
    //     error: () => this.showUniverseMessage(),
    //   });
  }

  private showUniverseMessage() {
    const messageNo = Math.ceil(Math.random() * 42) || 1;

    this.raffleResult.set({ imgSrc: `assets/game/cnc/msg-${messageNo}.png`, imgType: 'image', name: '', txHash: '' });
  }
}
