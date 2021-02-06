const AWS = require('aws-sdk');
const { randomBytes } = require('crypto');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3Bucket = new AWS.S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME },
});

module.exports = function uploadProfilePicture(b64Image) {
  const buff = Buffer.from(
    b64Image.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const fileName = randomBytes(8).toString('hex') + '.jpg';

  const data = {
    ACL: 'public-read',
    Key: fileName,
    Body: buff,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
    }
  });

  return `https://stagewood-profile-app.s3.us-east-2.amazonaws.com/${fileName}`;
};
