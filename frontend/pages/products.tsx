import React from 'react';
import Products, { ALL_PRODUCTS_QUERY } from '../components/Products';
import { addApolloState, initializeApollo } from '../lib/withData';

export default function products({ isFirstServerCall }) {
  console.log(isFirstServerCall);
  return (
    <div>
      <Products />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const apolloClient = initializeApollo();

  const isFirstServerCall = req?.url?.indexOf('/_next/data/') === -1;
  if (isFirstServerCall) {
    await apolloClient.query({
      query: ALL_PRODUCTS_QUERY,
    });
  }

  return addApolloState(apolloClient, {
    props: {
      isFirstServerCall,
    },
  });
}
