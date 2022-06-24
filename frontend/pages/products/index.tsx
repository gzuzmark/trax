import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';

import React, { FC } from 'react';
import Pagination from '../../components/Pagination';
import Products, { ALL_PRODUCTS_QUERY } from '../../components/Products';
import { addApolloState, initializeApollo } from '../../lib/withData';

const ProductsPage: FC = () => {
  const { query } = useRouter();
  const page = parseInt(query.page as string, 10) || 1;
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { url } = req as { url: string };
  const apolloClient = initializeApollo();

  const isFirstServerCall = url?.indexOf('/_next/data/') === -1;
  if (isFirstServerCall) {
    await apolloClient.query({
      query: ALL_PRODUCTS_QUERY,
    });
  }
  const newProps = addApolloState(apolloClient, {
    props: {},
  });

  return newProps;
};

export default ProductsPage;
