const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    profilePicture: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Query {
    currentUser: User!
  }

  type Mutation {
    signup(
      username: String!
      email: String!
      name: String!
      password: String!
      profilePicture: String!
    ): User!

    login(usernameOrEmail: String!, password: String!): AuthResponse!
  }
`;

module.exports = { typeDefs };
