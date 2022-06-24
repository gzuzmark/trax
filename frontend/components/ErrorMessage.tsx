import styled from 'styled-components';
import React, { FC } from 'react';

import PropTypes from 'prop-types';
import { ApolloError } from '@apollo/client';

interface ErrorMessageProps {
  error: ApolloError | undefined;
}
const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError: FC<ErrorMessageProps> = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.graphQLErrors && error.graphQLErrors.length) {
    return (
      <>
        {error.graphQLErrors.map((graphqlError, i) => (
          <ErrorStyles key={i}>
            <p data-test="graphql-error">
              <strong>Shoot!</strong>
              {graphqlError.message.replace('GraphQL error: ', '')}
            </p>
          </ErrorStyles>
        ))}
      </>
    );
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

export default DisplayError;
