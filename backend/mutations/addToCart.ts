import { BaseItem, KeystoneContext } from '@keystone-6/core/types';
import { Session } from '../types';
import { CartItemCreateInput } from '../node_modules/.keystone/types';
import { CartItem } from '../schemas/CartItem';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<BaseItem> {
  console.log('ADDINNG TO CART');

  // 1. Query the current user see uf the are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be signed in to add to cart');
  }
  // 2. Query the current user cart
  const allCartItems = await context.query.CartItem.findMany({
    where: {
      user: { id: { equals: session.itemId } },
      product: { id: { equals: productId } },
    },
    query: 'id quantity',
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // 3. See if the current item is in their cart
    // 4. if itis, increment by 1
    return context.db.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 4. if it isnt, create a new cart item!
  return context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
