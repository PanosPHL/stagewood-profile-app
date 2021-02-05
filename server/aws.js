const AWS = require('aws-sdk');
const { randomBytes } = require('crypto');
const {
  awsConfig: { region, accessKey, secretKey, bucketName },
} = require('./config');

AWS.config.update({
  region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });

module.exports = function uploadProfilePicture(b64Image) {
  console.log(bucketName);
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
    } else {
      console.log('success');
    }
  });

  return `https://stagewood-profile-app.s3.us-east-2.amazonaws.com/${fileName}`;
};
