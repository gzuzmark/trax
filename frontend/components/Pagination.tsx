import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import { FC } from 'react';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';

interface PaginationProps {
  page: number;
}
export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    count: productsCount
  }
`;

const Pagination: FC<PaginationProps> = ({ page }) => {
  const { error, loading, data } =
    useQuery<Record<string, number>>(PAGINATION_QUERY);
  if (loading) return <p>...loading</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
