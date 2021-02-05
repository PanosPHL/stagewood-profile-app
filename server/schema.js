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

  input SignUpInput {
    username: String! @constraint(minLength: 5, maxLength: 64)
    email: String! @constraint(minLength: 5, format: "email")
    name: String! @constraint(minLength: 3, maxLength: 255)
    password: String! @constraint(minLength: 5)
    profilePicture: String!
  }

  type Query {
    currentUser: User!
  }

  type Mutation {
    signup(input: SignUpInput): User!
    login(usernameOrEmail: String!, password: String!): AuthResponse!
  }
`;

module.exports = { typeDefs };
