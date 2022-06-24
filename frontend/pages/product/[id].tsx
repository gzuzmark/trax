import { FC } from 'react';
import { gql } from 'graphql-tag';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { addApolloState, initializeApollo } from '../../lib/withData';
import {
  SingleProduct,
  SINGLE_ITEM_QUERY,
} from '../../components/SingleProduct';
import { ALL_PRODUCTS_QUERY } from '../../components/Products';
import { IProduct } from '../../components/types/Product';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

interface Props {
  // query: { id: string };
  product: IProduct;
}

interface ProductData {
  products: IProduct[];
}

interface ProductVars {
  id: string;
}

export const SingleProductPage: FC<Props> = ({ product }) => {
  // const { query } = useRouter();
  // const { id } = query as { id: string };

  const { isFallback } = useRouter();
  return <SingleProduct product={product} />;
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { id } = params as { id: string };
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: SINGLE_ITEM_QUERY,
//     variables: { id },
//   });

//   return addApolloState(apolloClient, {
//     props: {},
//   });
// };

// You should use getStaticProps when:
// - The data required to render the page is available at build time ahead of a user’s request.
// - The data comes from a headless CMS.
// - The data can be publicly cached (not user-specific).
// - The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<Props>({
    query: SINGLE_ITEM_QUERY,
    variables: { id },
  });
  return {
    props: {
      product: data.product,
    },
    revalidate: 10,
  };
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<ProductData>({
    query: ALL_PRODUCTS_QUERY,
  });
  // your fetch function here

  const paths = data.products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths: paths || [],
    fallback: false,
  };
};

export default SingleProductPage;
