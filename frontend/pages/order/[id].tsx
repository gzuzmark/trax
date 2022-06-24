import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { z } from 'zod';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

export const orderValidator = z.object({
  id: z.string(),
  charge: z.string(),
  total: z.number(),
  items: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      photo: z.object({
        image: z.object({
          publicUrlTransformed: z.string(),
        }),
      }),
    })
  ),
});

export type OrderType = z.infer<typeof orderValidator>;

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery<{ order: OrderType }>(
    SINGLE_ORDER_QUERY,
    {
      variables: {
        id: query.id,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data || {};
  return (
    <OrderStyles>
      {order && (
        <>
          <Head>
            <title>Trax - {order.id}</title>
          </Head>
          <p>
            <span>Order ID:</span>
            <span>{order.id}</span>
          </p>
          <p>
            <span>Charge:</span>
            <span>{order.charge}</span>
          </p>
          <p>
            <span>Order Total:</span>
            <span>{formatMoney(order.total)}</span>
          </p>
          <p>
            <span>ItemCount:</span>
            <span>{order.items?.length}</span>
          </p>
          <div className="items">
            {order.items?.map((item) => (
              <div className="order-item" key={item.id}>
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>{formatMoney(item.price)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Sub total: {formatMoney(item.price * item.quantity)}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </OrderStyles>
  );
}
