import { ChangeDetectionStrategy, Component, DestroyRef, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { WalletService } from '@services/wallet.service';

import { DialogData, DialogPickNftComponent } from './dialog-pick-nft/dialog-pick-nft.component';
import { CONTRACT_ADDRESS } from 'environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMetadata } from './dialog-pick-nft/nft-query.service';
import { SwappableTraitsService } from '../swappable-traits.service';

@Component({
  templateUrl: './level-up.component.html',
  styleUrl: './level-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  providers: [SwappableTraitsService],
})
export class LevelUpComponent {
  protected chosenNFT: WritableSignal<IMetadata | undefined> = signal(undefined);
  protected chosenTrait: WritableSignal<IMetadata | undefined> = signal(undefined);

  constructor(
    private _destroyRef: DestroyRef,
    private _dialog: MatDialog,
    private _swappableTraitService: SwappableTraitsService,
    private _walletService: WalletService
  ) {}

  protected chooseNFT() {
    if (!this._walletService.key()) {
      this._walletService.connectWallet();
      return;
    }

    this._dialog
      .open(DialogPickNftComponent, {
        data: { collectionAddress: CONTRACT_ADDRESS.C1_SG721 } satisfies DialogData,
        width: '900px',
        backdropClass: ['bg-app', '!opacity-90'],
        panelClass: 'rounded-[50px]',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((metadata) => this.chosenNFT.set(metadata));
  }

  protected chooseTrait() {
    if (!this._walletService.key()) {
      this._walletService.connectWallet();
      return;
    }

    this._dialog
      .open(DialogPickNftComponent, {
        data: { collectionAddress: CONTRACT_ADDRESS.CERT_SG721 } satisfies DialogData,
        width: '900px',
        backdropClass: ['bg-app', '!opacity-90'],
        panelClass: 'rounded-[50px]',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((metadata) => this.chosenTrait.set(metadata));
  }

  protected updateNFT() {
    this._swappableTraitService
      .levelUp(this.chosenNFT()!.id, this.chosenTrait()!.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
