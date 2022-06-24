import Link from 'next/link';
import { env } from 'process';
import { useCart } from '../lib/CartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import useUser from './User';

export const Nav = () => {
  const { user } = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cartItems.reduce(
                (acc, cartItem) =>
                  acc + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign in</Link>}
    </NavStyles>
  );
};
