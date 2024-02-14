import { createClient } from 'graphql-http';

import { GRAPHQL_ENDPOINT } from 'src/lib/constants';

type QueryResult = { data: { tokens: { pageInfo: { total: number } } } };

export async function checkTokenHolder(ownerAddress: string, collectionAddresses: string[]) {
  const graphqlClient = createClient({ url: GRAPHQL_ENDPOINT });

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
