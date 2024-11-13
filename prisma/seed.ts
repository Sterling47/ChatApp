import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    const users = [
        {
          email: 'john.doe@example.com',
          username: 'john_doe',
          password: 'password123', // Plain password, will be hashed
        },
        {
          email: 'jane.smith@example.com',
          username: 'jane_smith',
          password: 'securepass456',
        },
        {
          email: 'admin@chatapp.com',
          username: 'admin_user',
          password: 'admin789',
        },
      ];

      for (const user of users) {
        await prisma.user.create({
          data: {
            email: user.email,
            username: user.username,
            password: user.password
          },
        });
      } 
      console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });