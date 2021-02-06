import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(input: $input) {
      token
      user {
        id
        username
        email
        name
        profilePicture
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
        name
        profilePicture
      }
    }
  }
`;
