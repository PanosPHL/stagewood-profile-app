const result = require('dotenv').config();

const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
  NODE_ENV,
  DATABASE_URL,
} = result.parsed;

module.exports = {
  environment: NODE_ENV || 'development',
  databaseUrl: DATABASE_URL,
  jwtConfig: {
    secret: JWT_SECRET_KEY,
    expiresIn: JWT_EXPIRES_IN,
  },
};
