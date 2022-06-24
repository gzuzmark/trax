import { ApolloCache, StoreObject, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FC } from 'react';

interface DeleteProductProps {
  id: string;
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`;

function update(
  cache: ApolloCache<unknown>,
  payload: { data: Record<string, unknown> }
) {
  // const { deleteProduct } = payload.data;
  // const identifierCache = cache.identify(deleteProduct as StoreObject);
  cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct: FC<DeleteProductProps> = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
