import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FC, FormEvent, useCallback } from 'react';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

interface SignInResponse {
  sessionToken: string;
  redeemUserPasswordResetToken: {
    code: string;
    message: string;
  };
}

interface ResetProps {
  token: string | string[];
}

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset: FC<ResetProps> = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation<SignInResponse>(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log(error);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // stop the form from submitting
      const res = await reset().catch(console.error);
      resetForm();
    },
    [reset, resetForm]
  );
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {/* <Error error={error || successfulError} /> */}
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can Now sign in</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
