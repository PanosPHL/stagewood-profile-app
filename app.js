const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, ValidationError } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const path = require('path');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const prisma = new PrismaClient();

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
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

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
