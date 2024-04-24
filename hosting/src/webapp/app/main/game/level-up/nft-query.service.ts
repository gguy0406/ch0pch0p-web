import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, take } from 'rxjs/operators';

export interface IToken {
  id: string;
  name: string;
  imgUrl: string;
}

@Injectable()
export class NftQueryService {
  constructor(
    private readonly _apollo: Apollo,
    private _httpClient: HttpClient
  ) {}

  getNFTImages(contract: string, owner: string) {
    return this._apollo
      .watchQuery<{
        tokens: { tokens: [{ tokenId: string; name: string; media: { visualAssets: { md: { url: string } } } }] };
      }>({
        query: gql`
          query TokenOwner($ownerAddrOrName: String, $collectionAddr: String) {
            tokens(ownerAddrOrName: $ownerAddrOrName, collectionAddr: $collectionAddr) {
              tokens {
                tokenId
                name
                media {
                  visualAssets {
                    md {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { collectionAddr: contract, ownerAddrOrName: owner },
      })
      .valueChanges.pipe(
        map((result) =>
          result.data.tokens.tokens.map((token) => ({
            id: token.tokenId,
            name: token.name,
            imgUrl: token.media.visualAssets.md.url,
          }))
        ),
        take(1)
      );
  }
}
