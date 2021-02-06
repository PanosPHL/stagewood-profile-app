const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, ValidationError } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const path = require('path');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const {
  jwtConfig: { secret },
} = require('./config');

const prisma = new PrismaClient();

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, secret);
    }
  } catch (e) {
    return null;
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    return {
      user,
      prisma,
    };
  },
});

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Listening on port 4000...`));
