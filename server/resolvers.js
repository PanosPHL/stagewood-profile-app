const result = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    signup: async (
      parent,
      { username, email, name, password, profilePicture = 'hi' },
      ctx,
      info
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          profilePicture,
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

      console.log(user, result);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        result.parsed.JWT_SECRET_KEY
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
