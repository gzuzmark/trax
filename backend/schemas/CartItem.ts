import { list } from '@keystone-6/core';
import { integer, relationship, select, text } from '@keystone-6/core/fields';

export const CartItem = list({
  // TODO

  // access,
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'id', 'user'],
    },
  },
  fields: {
    // TODO: Custom label here
    quantity: integer({
      defaultValue: 1,
    }),
    product: relationship({
      ref: 'Product',
    }),
    user: relationship({
      ref: 'User.cart',
    }),
  },
});
