import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable()
export class LevelUpService {
  constructor(private readonly _apollo: Apollo) {}

  getUserOwnedNFT(address: string) {
    return this._apollo
      .watchQuery<{
        token: { name: string; media: { visualAssets: { lg: { type: 'image' | 'animated_image'; url: string } } } };
      }>({
        query: gql`
          query GetUserOwnedToken($collectionAddr: String!, $tokenId: String!) {
            token(collectionAddr: $collectionAddr, tokenId: $tokenId) {
              media {
                visualAssets {
                  lg {
                    url
                    type
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
        }),
        take(1)
      );
  }
}
