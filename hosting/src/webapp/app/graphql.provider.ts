import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { STARGAZE_GRAPHQL_ENDPOINT } from 'environments/environment';

const uri = STARGAZE_GRAPHQL_ENDPOINT;

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink);

  return { link: httpLink.create({ uri }), cache: new InMemoryCache() };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  { provide: APOLLO_OPTIONS, useFactory: apolloOptionsFactory },
];
