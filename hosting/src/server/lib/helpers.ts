import { createClient } from 'graphql-http';

import { STARGAZE_GRAPHQL_ENDPOINT } from 'environments/environment';

export * from 'lib/helpers';

export async function graphqlQuery<T>(query: string, variables?: Record<string, unknown>) {
  const graphqlClient = createClient({ url: STARGAZE_GRAPHQL_ENDPOINT });

  return new Promise<T>((resolve, reject) => {
    let result: T;

    graphqlClient.subscribe(
      { query, variables },
      {
        next: (data) => (result = data.data as T),
        error: reject,
        complete: () => resolve(result),
      }
    );
  });
}
