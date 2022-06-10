import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { gql } from 'graphql-tag';
import { addApolloState, initializeApollo } from '../../lib/withData';

const SINGLE_ITEM_QUERY = gql`
  query {
    product(where: { id: "cl3nkul610001k0xjb6l681cb" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ idicito }) {
  console.log({ idicito });
  const { id } = useRouter();
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);

  console.log({ data, loading, error });
  return (
    <p>
      SingleProduct
      {id}
{' '}
    </p>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SINGLE_ITEM_QUERY,
    variables: { id },
  });

  return addApolloState(apolloClient, {
    props: {
      idicito: id,
    },
  });
}
