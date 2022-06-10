import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';
import { IProduct } from './types/Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  // eslint-disable-next-line react/jsx-one-expression-per-line
  if (error) return <p> Error:{error.message} </p>;
  return (
    <div>
      <ProductsListStyles>
        {data.products.map((product: IProduct) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

export default Products;
