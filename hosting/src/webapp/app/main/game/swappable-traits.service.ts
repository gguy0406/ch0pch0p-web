import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate';
import { toUtf8 } from '@cosmjs/encoding';
import { coins } from '@cosmjs/stargate';
import { Apollo, gql } from 'apollo-angular';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { CONTRACT_ADDRESS, MACHINE_CONFIG } from 'environments/environment';

import { API_ROUTE, ST_GAME_FEE, SWAPPABLE_TRAITS_ROUTE, WEB_RUNNER_ADDRESS } from '@lib/constants';
import { GachaPrize } from '@lib/dto-types';
import { QueryCheckTokenHolderResult, getGraphqlQueryCheckTokenHolder } from '@lib/helpers';
import { STMachine } from '@lib/types';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class SwappableTraitsService {
  private _baseUrl = API_ROUTE.SWAPPABLE_TRAITS;

  constructor(
    private readonly _apollo: Apollo,
    private readonly _httpClient: HttpClient,
    private readonly _walletService: WalletService
  ) {}

  checkEligible(machine: STMachine, address: string) {
    return new Observable<boolean>((subscriber) => {
      const ch0pch0pHolderQuery = getGraphqlQueryCheckTokenHolder(address, [
        CONTRACT_ADDRESS.C0_SG721,
        CONTRACT_ADDRESS.C1_SG721,
      ]);

      this._checkEligibleOb(ch0pch0pHolderQuery)
        .pipe(
          mergeMap((isEligible) => {
            if (isEligible) return of(true);
            if (!MACHINE_CONFIG[machine].CONTRACT_ADDRESSES_HOLDER_CHECK.length) return of(false);

            const collabHolderQuery = getGraphqlQueryCheckTokenHolder(
              address,
              MACHINE_CONFIG[machine].CONTRACT_ADDRESSES_HOLDER_CHECK
            );

            return this._checkEligibleOb(collabHolderQuery);
          })
        )
        .subscribe((isEligible) => {
          subscriber.next(isEligible);
          subscriber.complete();
        });
    });
  }

  play(machine: STMachine) {
    return this._walletService.getSigningClient().pipe(
      mergeMap((client) => {
        const userAddr = this._walletService.key()!.bech32Address;
        const msgSend = MsgSend.fromPartial({
          fromAddress: userAddr,
          toAddress: WEB_RUNNER_ADDRESS,
          amount: coins(ST_GAME_FEE * 10 ** 6, 'ustars'),
        });

        return from(
          client.sign(
            userAddr,
            [{ typeUrl: '/cosmos.bank.v1beta1.MsgSend', value: msgSend }],
            { amount: coins(0, 'ustars'), gas: '80000' },
            'play ch0pch0p lucky gacha'
          )
        );
      }),
      mergeMap((signedTx) =>
        this._httpClient.put<GachaPrize>(`${this._baseUrl}${SWAPPABLE_TRAITS_ROUTE.PLAY}/${machine}`, {
          payFeeTx: Array.from(Uint8Array.from(TxRaw.encode(signedTx).finish())),
        })
      )
    );
  }

  levelUp(tokenId: string, traitId: string) {
    return this._walletService.getSigningClient().pipe(
      mergeMap((client) => {
        const userAddr = this._walletService.key()!.bech32Address;
        const transferMsg: MsgExecuteContractEncodeObject = {
          typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
          value: MsgExecuteContract.fromPartial({
            sender: userAddr,
            contract: CONTRACT_ADDRESS.CERT_SG721,
            msg: toUtf8(JSON.stringify({ transfer_nft: { recipient: WEB_RUNNER_ADDRESS, token_id: traitId } })),
          }),
        };

        return from(
          client.sign(userAddr, [transferMsg], { amount: coins(0, 'ustars'), gas: '150000' }, 'level up ch0pch0p')
        );
      }),
      mergeMap((signedTx) =>
        this._httpClient.put<{ txHash: string; image: string }>(
          `${this._baseUrl}${SWAPPABLE_TRAITS_ROUTE.LEVEL_UP}/${tokenId}`,
          {
            transferTx: Array.from(Uint8Array.from(TxRaw.encode(signedTx).finish())),
          }
        )
      )
    );
  }

  private _checkEligibleOb(queryBuilder: ReturnType<typeof getGraphqlQueryCheckTokenHolder>) {
    return this._apollo
      .watchQuery<QueryCheckTokenHolderResult>({
        query: gql`
          ${queryBuilder.query}
        `,
        variables: queryBuilder.variables,
      })
      .valueChanges.pipe(
        map((result) => {
          if (!result.data?.tokens) throwError(() => new Error('Incorrect response'));

          return !!result.data?.tokens.pageInfo.total;
        }),
        take(1)
      );
  }
}
