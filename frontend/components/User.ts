import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { IProduct } from './types/Product';

interface ICartItem {
  id: string;
  quantity: number;
  product: IProduct;
}

interface User {
  id: string;
  email: string;
  name: string;
  cartItems: ICartItem[];
}

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cartItems: cart {
          id
          quantity
          product {
            id
            price
            name
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

const useUser = () => {
  const { data, loading, error } =
    useQuery<Record<string, User>>(CURRENT_USER_QUERY);

  return { user: data?.authenticatedItem, loading, error };
};

export default useUser;
export type { ICartItem, User };
