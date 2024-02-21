import { Injectable, WritableSignal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keplr, Key } from '@keplr-wallet/types';

import { CHAIN_ID, KEPLR_URL } from 'src/lib/constants';

@Injectable({ providedIn: 'root' })
export class WalletService {
  key: WritableSignal<Key | undefined> = signal(undefined);

  protected keplr?: Keplr;

  constructor(private _snackBar: MatSnackBar) {}

  connectWallet() {
    this._connectKeplr();
  }

  private _connectKeplr() {
    if (!window.keplr) {
      this._snackBar
        .open('Please install keplr', 'Install', { duration: 6000, horizontalPosition: 'end' })
        .onAction()
        .subscribe(() => window.open(KEPLR_URL, '_blank'));
      return;
    }

    (async () => {
      this.keplr = window.keplr!;

      try {
        await this.keplr.enable(CHAIN_ID);

        this.key.set(await this.keplr.getKey(CHAIN_ID));

        window.addEventListener('keplr_keystorechange', async () => {
          this.key.set(await this.keplr!.getKey(CHAIN_ID));
        });
      } catch {
        /* empty */
      }
    })();
  }
}
