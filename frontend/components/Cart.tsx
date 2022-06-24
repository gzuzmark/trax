import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import styled from 'styled-components';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/CartState';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import CartStyles from './styles/CartStyles';
import Trax from './styles/Trax';
import useUser, { ICartItem } from './User';
import { Checkout } from './Checkout';

interface CartItemProps {
  item: ICartItem;
}

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    object-fit: fill;
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

const CartItem = ({
  item: { id: cartItemId, product, quantity },
}: CartItemProps) => {
  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        width={100}
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.altText}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * quantity)}-
          <em>
            {quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItemId} />
    </CartItemStyles>
  );
};

const Cart = () => {
  const { user } = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!user) return null;
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Trax>{user.name}'s Cart</Trax>
        <CloseButton type="button" onClick={closeCart}>
          Close
        </CloseButton>
      </header>
      <ul>
        {user?.cartItems?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        {formatMoney(calcTotalPrice(user.cartItems))}
        <Checkout />
      </footer>
    </CartStyles>
  );
};

export default Cart;
