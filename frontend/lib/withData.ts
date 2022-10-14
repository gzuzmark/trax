/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { createUploadLink } from 'apollo-upload-client';
import { GetServerSidePropsResult } from 'next';
import { endpoint, prodEndpoint } from '../config';
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import paginationField from './paginationField';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// eslint-disable-next-line new-cap
const httpLink = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint, // Server URL (must be absolute)
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`
});

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {            
            products: function() {
              return paginationField();
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState = null
): ApolloClient<NormalizedCacheObject> {
  const helperApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = helperApolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    helperApolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return helperApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = helperApolloClient;

  return helperApolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: any }
): GetServerSidePropsResult<{ [key: string]: any }> {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: { [x: string]: any }) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
