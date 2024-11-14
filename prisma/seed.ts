import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    const users = [
        {
          email: 'konber3@gmail.com',
          username: 'akrazy47',
          password: 'chattrAdmin01',
        },
        {
          email: 'jane.smith@example.com',
          username: 'jane_smith',
          password: 'chattrAdmin02',
        },
        {
          email: 'admin@chatapp.com',
          username: 'admin_user',
          password: 'chattrAdmin03',
        },
      ];

      await prisma.user.deleteMany();

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