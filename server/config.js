const result = require('dotenv').config();

const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
  NODE_ENV,
  DATABASE_URL,
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
} = result.parsed;

module.exports = {
  environment: NODE_ENV || 'development',
  databaseUrl: DATABASE_URL,
  jwtConfig: {
    secret: JWT_SECRET_KEY,
    expiresIn: JWT_EXPIRES_IN,
  },
  awsConfig: {
    region: AWS_REGION,
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    bucketName: AWS_BUCKET_NAME,
  },
};
