const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Listening on port 4000...`));
