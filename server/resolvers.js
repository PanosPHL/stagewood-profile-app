const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  jwtConfig: { secret },
} = require('./config');
const uploadProfilePicture = require('./aws');
const { validateSignUp } = require('./validators');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const resolvers = {
  Mutation: {
    signup: async (
      parent,
      { input: { username, email, name, password, profilePicture } },
      ctx,
      info
    ) => {
      const validationErrors = validateSignUp(username, email, name, password);

      if (validationErrors.length) {
        throw new UserInputError(
          'Failed to sign up user due to validation errors',
          {
            validationErrors,
          }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const url = uploadProfilePicture(profilePicture);

      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          profilePicture: url,
        },
      });

      return user;
    },
    login: async (parent, { usernameOrEmail, password }, ctx, info) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          OR: [
            {
              username: {
                equals: usernameOrEmail,
              },
            },
            {
              email: {
                equals: usernameOrEmail,
              },
            },
          ],
        },
      });

      if (!user) {
        throw new AuthenticationError('Invalid Login');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new AuthenticationError('Invalid Login');
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        secret
      );

      return {
        user,
        token,
      };
    },
  },
};

module.exports = {
  resolvers,
};
