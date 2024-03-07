import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTE, NFT_POOL_ROUTE } from '@lib/constants';
import { GachaPrize } from '@lib/dto-types';

@Injectable()
export class NftPoolService {
  private _baseUrl = API_ROUTE.NFT_POOL;

  constructor(
    private readonly _apollo: Apollo,
    private readonly _httpClient: HttpClient
  ) {}

  play(address: string) {
    return this._httpClient.put<GachaPrize>(`${this._baseUrl}${NFT_POOL_ROUTE.PLAY}/${address}`, {});
  }

  getTokenInfo(contract: string, tokenId: string, txHash: string) {
    return this._apollo
      .watchQuery<{ token: { name: string; media: { visualAssets: { lg: { url: string } } } } }>({
        query: gql`
          query GetTokenInfo($collectionAddr: String!, $tokenId: String!) {
            token(collectionAddr: $collectionAddr, tokenId: $tokenId) {
              media {
                visualAssets {
                  lg {
                    url
                  }
                }
              }
              name
            }
          }
        `,
        variables: { collectionAddr: contract, tokenId: tokenId },
      })
      .valueChanges.pipe(
        map((result) => {
          if (!result.data?.token) throwError(() => new Error('Incorrect response'));

          return { txHash, token: result.data.token };
        })
      );
  }
}
