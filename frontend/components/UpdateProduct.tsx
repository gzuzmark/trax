import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import React, { FC } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { IProduct } from './types/Product';
import account from '../pages/account';

interface Props {
  product: IProduct;
}

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct: FC<Props> = ({ product }) => {
  const { id } = product;
  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    product as unknown as Record<string, string>
  );

  if (!product) return <p>...loading</p>;
  return (
    <div>
      <h1>Update Product</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // Submit the inputfields to the backend:
          const res = await updateProduct({
            variables: {
              id,
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          }).catch(console.error);
          //   clearForm();
          // Go to the products page
        }}
      >
        <DisplayError error={updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          {/* <label htmlFor="image">
            Image
            <input
              required
              type="file"
              id="image"
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </label> */}
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={(e) => handleChange(e)}
            />
          </label>

          <button type="submit">Update Product</button>
        </fieldset>
      </Form>
    </div>
  );
};
export default UpdateProduct;
