import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(input: $input) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
