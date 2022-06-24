import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { FC, Props } from 'react';
import UpdateProduct from '../components/UpdateProduct';
import { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { initializeApollo } from '../lib/withData';
import { IProduct } from '../components/types/Product';

interface Props {
  // query: { id: string };
  product: IProduct;
}

interface ProductData {
  products: IProduct[];
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
const UpdatePage: FC<Props> = ({ product }) => {
  const { query } = useRouter();
  return (
    <div>
      <UpdateProduct product={product} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<Props>({
    query: SINGLE_ITEM_QUERY,
    variables: { id },
  });

  if (!data.product) {
    return {
      redirect: {
        permanent: false, // or false
        destination: '/products',
      },
    };
  }
  return {
    props: {
      product: data.product,
    },
  };
};

export default UpdatePage;
