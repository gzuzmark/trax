import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEvent, useCallback } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

interface ISignIn {
  name: string;
  password: string;
}

interface SignInResponse {
  sessionToken: string;
  wasSent: boolean;
}

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    wasSent: sendUserPasswordResetLink(email: $email)
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { loading, data, error }] = useMutation<SignInResponse>(
    REQUEST_RESET_MUTATION,
    {
      variables: { ...inputs },
    }
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Submit the inputfields to the backend:
      const res = await signup().catch(console.error);

      resetForm();
    },
    [signup, resetForm]
  );

  //   const error = !data?.sessionToken
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.wasSent && <p>Success! Check your email for a link!</p>}
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
