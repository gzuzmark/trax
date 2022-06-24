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
  user: {
    id: string;
    email: string;
    name: string;
    permissions: string[];
  };
}

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    user: createUser(
      data: { email: $email, name: $name, password: $password }
    ) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { loading, data, error }] = useMutation<SignInResponse>(
    SIGNUP_MUTATION,
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
      <h2>Sign up</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.user && (
          <p>Signed up with {data.user.email} - Please go ahead and Sign in!</p>
        )}
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
        <label htmlFor="name">
          name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
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

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
