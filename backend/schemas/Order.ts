import { list } from '@keystone-6/core';
import { integer, relationship, select, text } from '@keystone-6/core/fields';

export const Order = list({
  fields: {
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
