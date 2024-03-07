import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(
    protected walletService: WalletService,
    private _destroyRef: DestroyRef,
    private _nftPoolService: NftPoolService
  ) {}

  protected play() {
    this._nftPoolService
      .play(this.walletService.key()!.bech32Address)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
