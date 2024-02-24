import { Injectable, WritableSignal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keplr, Key } from '@keplr-wallet/types';

import { KEPLR_URL } from '@lib/constants';

import { STARGAZE_CHAIN_ID } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class WalletService {
  isActive: WritableSignal<boolean> = signal(false);
  key: WritableSignal<Key | undefined> = signal(undefined);

  protected keplr?: Keplr;

  constructor(private _snackBar: MatSnackBar) {}

  connectWallet() {
    this._connectKeplr();
  }

  private _connectKeplr() {
    if (!window.keplr) {
      this._snackBar
        .open('Please install keplr', 'Install')
        .onAction()
        .subscribe(() => window.open(KEPLR_URL, '_blank'));
      return;
    }

    (async () => {
      this.keplr = window.keplr!;

      try {
        await this.keplr.enable(STARGAZE_CHAIN_ID);

        this.key.set(await this.keplr.getKey(STARGAZE_CHAIN_ID));

        window.addEventListener('keplr_keystorechange', async () => {
          this.key.set(await this.keplr!.getKey(STARGAZE_CHAIN_ID));
        });
      } catch {
        /* empty */
      }
    })();
  }
}
