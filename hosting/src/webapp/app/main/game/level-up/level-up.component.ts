import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { WalletService } from '@services/wallet.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './level-up.component.html',
  styleUrl: './level-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class LevelUpComponent {
  protected userOwnedNFTs = [];
  protected chosenNFT = {};
  protected userOwnedTraits = [];
  protected chosenTrait = {};

  constructor(
    private _destroyRef: DestroyRef,
    private _walletService: WalletService
  ) {
    this._walletService.keyChange$.pipe(takeUntilDestroyed()).subscribe(() => {});
  }

  protected chooseNFT() {
    this._checkIsWalletConnected(() => {});
  }

  protected chooseTrait() {}

  protected updateNFT() {}

  private _checkIsWalletConnected(cb: () => void) {
    if (this._walletService.key()) {
      cb();
      return;
    }

    this._walletService.keyChange$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => cb());
  }
}
