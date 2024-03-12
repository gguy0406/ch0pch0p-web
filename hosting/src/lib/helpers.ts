export type QueryCheckTokenHolderResult = { tokens: { pageInfo: { total: number } } };

export function getGraphqlQueryCheckTokenHolder(ownerAddress: string, collectionAddresses: readonly string[]) {
  return {
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
  };
}
