const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, ValidationError } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const prisma = new PrismaClient();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: {
    prisma,
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Listening on port 4000...`));
