import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Apollo, gql } from 'apollo-angular';
import { STARGAZE_RPC_ENDPOINT } from 'environments/environment';
import { forkJoin, from, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

export interface IMetadata {
  id: string;
  swappable: boolean;
  name: string;
  image: string;
}

@Injectable()
export class NftQueryService {
  constructor(
    private readonly _apollo: Apollo,
    private _httpClient: HttpClient
  ) {}

  getNFTImages(contract: string, owner: string) {
    return this._apollo
      .watchQuery<{ tokens: { tokens: { tokenId: string }[] } }>({
        query: gql`
          query TokenOwner($ownerAddrOrName: String, $collectionAddr: String) {
            tokens(ownerAddrOrName: $ownerAddrOrName, collectionAddr: $collectionAddr) {
              tokens {
                tokenId
              }
            }
          }
        `,
        variables: { collectionAddr: contract, ownerAddrOrName: owner },
      })
      .valueChanges.pipe(
        map((result) => result.data.tokens.tokens.map((token) => token.tokenId)),
        mergeMap((ids) =>
          ids.length
            ? from(
                (async () => {
                  const cosmWasmClient = await CosmWasmClient.connect(STARGAZE_RPC_ENDPOINT);
                  const obs = await Promise.all(
                    ids.map(async (id) => {
                      let tokenUri = (await cosmWasmClient.queryContractSmart(contract, { nft_info: { token_id: id } }))
                        .token_uri;

                      if (!(tokenUri as string).endsWith('.json')) tokenUri += '.json';

                      return this._httpClient
                        .get<IMetadata>(tokenUri.replace('ipfs://', 'https://nftstorage.link/ipfs/'))
                        .pipe(map((metadata) => ({ ...metadata, id })));
                    })
                  );

                  return obs;
                })()
              ).pipe(mergeMap((obs) => forkJoin(obs)))
            : of([])
        ),
        map((metadataArr) =>
          metadataArr
            .filter((metadata) => metadata.swappable)
            .map((metadata) => ({
              ...metadata,
              image: metadata.image.replace('ipfs://', 'https://nftstorage.link/ipfs/'),
            }))
        ),
        take(1)
      );
  }
}
