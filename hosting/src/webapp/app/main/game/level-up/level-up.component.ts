import { ChangeDetectionStrategy, Component, DestroyRef, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

import { C1_SWAPPABLE_NFT } from '@lib/constants';
import { WalletService } from '@services/wallet.service';

import { CONTRACT_ADDRESS } from 'environments/environment';

import { SwappableTraitsService } from '../swappable-traits.service';
import { DialogData, DialogPickNftComponent } from './dialog-pick-nft/dialog-pick-nft.component';
import { IToken, NftQueryService } from './nft-query.service';

@Component({
  templateUrl: './level-up.component.html',
  styleUrl: './level-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  providers: [NftQueryService, SwappableTraitsService],
})
export class LevelUpComponent {
  protected chosenNFT: WritableSignal<IToken | undefined> = signal(undefined);
  protected chosenTrait: WritableSignal<IToken | undefined> = signal(undefined);

  constructor(
    private _destroyRef: DestroyRef,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _nftQueryService: NftQueryService,
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
        data: {
          collectionAddress: CONTRACT_ADDRESS.C1_SG721,
          header: 'Pick a ch0pch0p to level up',
          nftQuery: this._nftQueryService
            .getNFTImages(CONTRACT_ADDRESS.C1_SG721, this._walletService.key()!.bech32Address)
            .pipe(
              map((tokens) => tokens.filter((token) => C1_SWAPPABLE_NFT[token.id as keyof typeof C1_SWAPPABLE_NFT]))
            ),
        } satisfies DialogData,
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
        data: {
          collectionAddress: CONTRACT_ADDRESS.CERT_SG721,
          header: 'Pick a self trait you want to swap',
          nftQuery: this._nftQueryService.getNFTImages(
            CONTRACT_ADDRESS.CERT_SG721,
            this._walletService.key()!.bech32Address
          ),
        } satisfies DialogData,
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
      .subscribe((result) => {
        this.chosenNFT.set(undefined);
        this.chosenTrait.set(undefined);
        this._snackBar.open(`Leveled up, check out tx: ${result.txHash}`);
      });
  }
}
