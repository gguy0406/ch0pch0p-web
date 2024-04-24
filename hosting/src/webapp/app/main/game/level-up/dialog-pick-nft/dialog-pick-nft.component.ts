import { ChangeDetectionStrategy, Component, Inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

import { BUY_CH0PCH0P_URL } from '@lib/constants';
import { getMarketplaceUrl } from '@lib/helpers';
import { WalletService } from '@services/wallet.service';

import { IMetadata, NftQueryService } from './nft-query.service';

export interface DialogData {
  collectionAddress: string;
  header: string;
}

@Component({
  selector: 'app-dialog-pick-nft',
  templateUrl: './dialog-pick-nft.component.html',
  styleUrl: './dialog-pick-nft.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatProgressSpinnerModule],
  providers: [NftQueryService],
})
export class DialogPickNftComponent {
  protected isQueryingData: WritableSignal<boolean> = signal(false);
  protected buyNFTUrl: WritableSignal<string> = signal(BUY_CH0PCH0P_URL);
  protected header: WritableSignal<string> = signal('Pick a NFT to level up');
  protected metadata: WritableSignal<IMetadata[]> = signal([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) _data: DialogData,
    _nftQueryService: NftQueryService,
    _walletService: WalletService,
    private _dialogRef: MatDialogRef<DialogPickNftComponent>
  ) {
    this.isQueryingData.set(true);
    this.buyNFTUrl.set(getMarketplaceUrl(_data.collectionAddress));
    this.header.set(_data.header);

    _nftQueryService
      .getNFTImages(_data.collectionAddress, _walletService.key()!.bech32Address)
      .pipe(
        finalize(() => this.isQueryingData.set(false)),
        takeUntilDestroyed()
      )
      .subscribe((metadata) => this.metadata.set(metadata));
  }

  protected pickNFT(metadata: IMetadata) {
    this._dialogRef.close(metadata);
  }
}
