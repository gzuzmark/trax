import { Cache, Reference, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

type RemoveFromCartProps = {
  id: string;
};

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: { id: $id }) {
      id
    }
  }
`;

// function update(cache, payload) {

// }

const RemoveFromCart = ({ id }: RemoveFromCartProps) => {
  const [removeFromCart, { loading, data }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
      update(cache, payload) {
        cache.evict(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          cache.identify(payload.data.deleteCartItem) as Cache.EvictOptions
        );
      },
      // optimisticResponse: {
      //   deleteCartItem: {
      //     __typename: 'CartItem',
      //     id: 'temp-id',
      //   },
      // },
    }
  );

  return (
    <BigButton
      onClick={() => removeFromCart()}
      disabled={loading}
      type="button"
      title="Remove This Item from cart"
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
