import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export const Nav = () => (
  <NavStyles>
    <Link href="/products">Products</Link>
    <Link href="/sell">Sell</Link>
    <Link href="/orders">Orders</Link>
    <Link href="/account">Account</Link>
  </NavStyles>
);
