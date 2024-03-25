import { Injectable, WritableSignal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { Keplr, Key } from '@keplr-wallet/types';
import { Subject, from } from 'rxjs';

import { STARGAZE_CHAIN_ID, STARGAZE_RPC_ENDPOINT } from 'environments/environment';

import { KEPLR_URL } from '@lib/constants';

@Injectable({ providedIn: 'root' })
export class WalletService {
  isActive: WritableSignal<boolean> = signal(false);
  key: WritableSignal<Key | undefined> = signal(undefined);
  keyChange$: Subject<void> = new Subject();

  get offlineSigner() {
    return this.keplr?.getOfflineSigner(STARGAZE_CHAIN_ID);
  }

  protected keplr?: Keplr;

  constructor(private _snackBar: MatSnackBar) {}

  connectWallet() {
    this._connectKeplr();
  }

  getSigningClient() {
    if (!this.offlineSigner) throw new Error('Cannot get offline signer');

    return from(
      SigningCosmWasmClient.connectWithSigner(STARGAZE_RPC_ENDPOINT, this.offlineSigner, {
        gasPrice: GasPrice.fromString('1ustars'),
      })
    );
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
        this.keyChange$.next();

        window.addEventListener('keplr_keystorechange', async () => {
          this.key.set(await this.keplr!.getKey(STARGAZE_CHAIN_ID));
          this.keyChange$.next();
        });
      } catch {
        /* empty */
      }
    })();
  }
}
