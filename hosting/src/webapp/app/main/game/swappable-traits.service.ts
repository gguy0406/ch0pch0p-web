import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { CONTRACT_ADDRESS, MACHINE_CONFIG } from 'environments/environment';

import { API_ROUTE, SWAPPABLE_TRAITS_ROUTE } from '@lib/constants';
import { GachaPrize } from '@lib/dto-types';
import { QueryCheckTokenHolderResult, getGraphqlQueryCheckTokenHolder } from '@lib/helpers';
import { STMachine } from '@lib/types';

@Injectable()
export class SwappableTraitsService {
  private _baseUrl = API_ROUTE.SWAPPABLE_TRAITS;

  constructor(
    private readonly _apollo: Apollo,
    private readonly _httpClient: HttpClient
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

  play(machine: STMachine, payFeeTx: Uint8Array) {
    return this._httpClient.put<GachaPrize>(`${this._baseUrl}${SWAPPABLE_TRAITS_ROUTE.PLAY}/${machine}`, { payFeeTx });
  }

  levelUp(tokenId: string, transferTx: Uint8Array) {
    return this._httpClient.put<void>(`${this._baseUrl}${SWAPPABLE_TRAITS_ROUTE.LEVEL_UP}/${tokenId}`, { transferTx });
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
