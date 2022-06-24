import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { gql } from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import { IProduct } from './types/Product';

interface SingleProductData {
  product: IProduct;
}

interface SingleProductVars {
  id: string;
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: 2rem;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: top;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

interface SingleProductProps {
  // id: string;
  product: IProduct;
}

export const SingleProduct: FC<SingleProductProps> = ({ product }) => {
  const { id } = product;
  // const { data, loading, error } = useQuery<
  //   SingleProductData,
  //   SingleProductVars
  // >(SINGLE_ITEM_QUERY, { variables: { id } });
  // if (loading) return <p>loading</p>;
  // if (error) return <DisplayError error={error} />;
  // const { product } = data as SingleProductData;
  const { image, altText } = product.photo as {
    image: { publicUrlTransformed: string };
    altText: string;
  };
  return (
    <ProductStyles>
      <Head>
        <title>Sick fits |{product.name}</title>
      </Head>
      <img src={image.publicUrlTransformed} alt={altText} />
      <div className="details">
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
