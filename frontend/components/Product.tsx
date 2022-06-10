import Link from 'next/link';
import React, { Key } from 'react';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import TitleStyles from './styles/Title';
import { IProduct } from './types/Product';
import formatMoney from '../lib/formatMoney';

interface IProductProps {
  // eslint-disable-next-line react/no-unused-prop-types
  key: Key;
  product: IProduct;
}

const Product: React.FC<IProductProps> = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <TitleStyles>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </TitleStyles>
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    {/* Add buttons to edit and delete */}
  </ItemStyles>
);

export default Product;
