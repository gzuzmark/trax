/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BaseItem, KeystoneContext } from '@keystone-6/core/types';

import { Session } from '../types';
import {
  CartItemCreateInput,
  UserCreateInput,
} from '../node_modules/.keystone/types';
import stripeConfig from '../lib/stripe';
import { User } from '../schemas/User';

const graphql = String.raw;
export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<any> {
  // 1.  check if user signed in
  const userId = context?.session?.itemId as string;
  if (!userId) {
    throw new Error('You must be signed in to checkout');
  }

  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql`
    id
    name    
    email
    cart {
        id
        quantity
        product {
            id
            name
            price
            description
            photo {
                id
                image {
                    id
                    publicUrlTransformed
                }
            }
        }
    }    
    `,
  });
  console.dir(user, { depth: null });
  // 2. Calculate the total price of their order
  const cartItems = user?.cart?.filter((cartItem: any) => cartItem.product);
  const amount = cartItems?.reduce(function (acc, cartItem) {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);
  console.log('🚀 ~ file: checkout.ts ~ line 55 ~ amount', amount);
  // 3. Create the charge with the stripe libary
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'usd',
      confirm: true,
      payment_method: token,
    })
    .catch((err: any) => {
      console.log('🚀 ~ file: checkout.ts ~ line 68 ~ err', err);
      throw new Error(err.message);
    });
  console.log('🚀 ~ file: checkout.ts ~ line 71 ~ charge', charge);
  // 4. Create cartitems to orderitems
  const orderItems = cartItems.map((cartItem: any) => {
    const { product } = cartItem;
    const { photo } = product;
    console.log('🚀 ~ file: checkout.ts ~ line 72 ~ orderItems ~ cartItem', {
      photo,
    });
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });
  console.log(
    '🚀 ~ file: checkout.ts ~ line 81 ~ orderItems ~ orderItems',
    orderItems
  );
  // 5. create the order and save it

  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  console.log({ order });
  // 6. Clean up any old cart item
  const cartItemIds = user.cart.map((cartItem: any) => cartItem.id);
  console.log('🚀 ~ file: checkout.ts ~ line 99 ~ cartItemIds', cartItemIds);

  const res = await context.query.CartItem.deleteMany({
    where: cartItemIds.map((id: string) => ({ id })),
  });
  console.log('🚀 ~ file: checkout.ts ~ line 104 ~ res', res);

  return order;
}
