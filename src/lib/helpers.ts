import { createClient } from 'graphql-http';

import { STARGAZE_GRAPHQL_ENDPOINT } from './constants';

type QueryResult = { data: { tokens: { pageInfo: { total: number } } } };

export function getMarketplaceUrl(contractAddress: string) {
  return `https://www.stargaze.zone/m/${contractAddress}/tokens`;
}

export async function checkTokenHolder(ownerAddress: string, collectionAddresses: readonly string[]) {
  const graphqlClient = createClient({ url: STARGAZE_GRAPHQL_ENDPOINT });

  const result = await new Promise<QueryResult>((resolve, reject) => {
    let result: QueryResult;

    graphqlClient.subscribe(
      {
        query: `query TokenOwner(
          $tokensOwnerAddrOrName: String
          $tokensFilterByCollectionAddrs: [String!]
        ) {
          tokens( ownerAddrOrName: $tokensOwnerAddrOrName filterByCollectionAddrs: $tokensFilterByCollectionAddrs ) {
            pageInfo { total }
          }
        }`,
        variables: {
          tokensOwnerAddrOrName: ownerAddress,
          tokensFilterByCollectionAddrs: collectionAddresses,
        },
      },
      {
        next: (data) => (result = data as QueryResult),
        error: reject,
        complete: () => resolve(result),
      }
    );
  });

  return !!result.data.tokens.pageInfo.total;
}
