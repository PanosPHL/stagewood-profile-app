const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  jwtConfig: { secret },
} = require('./config');

const resolvers = {
  Mutation: {
    signup: async (
      parent,
      { input: { username, email, name, password, profilePicture } },
      ctx,
      info
    ) => {
      console.log('hit', password);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          profilePicture: '',
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

      console.log(user, secret);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return;
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
