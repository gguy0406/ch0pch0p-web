import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://graphql.mainnet.stargaze-apis.com/graphql';

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink);

  return { link: httpLink.create({ uri }), cache: new InMemoryCache() };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  { provide: APOLLO_OPTIONS, useFactory: apolloOptionsFactory },
];
