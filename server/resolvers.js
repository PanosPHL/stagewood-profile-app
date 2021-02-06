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
      console.log('hit');
      const validationErrors = validateSignUp(username, email, name, password);

      if (validationErrors.length) {
        throw new UserInputError(
          'Failed to sign up user due to validation errors',
          {
            validationErrors,
          }
        );
      }

      let user = await ctx.prisma.user.findFirst({
        where: {
          OR: [
            {
              username: {
                equals: username,
              },
            },
            {
              email: {
                equals: email,
              },
            },
          ],
        },
      });

      if (user) {
        throw new UserInputError('Failed to sign up due to validation errors', {
          validationErrors: [
            'A user already exists with this username or email',
          ],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const url = uploadProfilePicture(profilePicture);

      user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          profilePicture: url,
        },
      });

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        secret
      );

      return { user, token };
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
