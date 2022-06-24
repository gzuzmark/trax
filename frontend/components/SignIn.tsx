import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEvent, useCallback } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

interface ISignIn {
  email: string;
  password: string;
}

interface SignInResponse {
  sessionToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    permissions: string[];
  };
}

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { loading, data }] = useMutation<SignInResponse>(
    SIGNIN_MUTATION,
    {
      variables: { ...inputs },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Submit the inputfields to the backend:
      const res = await signin();
      resetForm();
    },
    [signin, resetForm]
  );

  const error = !data?.sessionToken
    ? data?.authenticateUserWithPassword
    : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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

        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
