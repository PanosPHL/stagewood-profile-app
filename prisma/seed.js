const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      username: 'PanosPHL',
      email: 'panosssbm@gmail.com',
      name: 'Panayiotis Dimopoulos',
      password: await bcrypt.hash('password', 10),
      profilePicture:
        'https://stagewood-profile-app.s3.us-east-2.amazonaws.com/54c65b8fc7e70f27.jpg',
    },
  });
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
