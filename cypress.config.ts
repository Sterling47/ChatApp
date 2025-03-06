import { defineConfig } from "cypress";
import prisma from "@/lib/db";
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        async cleanupTestUsers() {
          try {
            await prisma.$connect();
            const deletedUsers = await prisma.user.deleteMany({
              where: {
                email: {
                  startsWith: 'test-user',
                },
              },
            });
            console.log(`Deleted ${deletedUsers.count} test users`);
            return deletedUsers.count;
          } catch (error) {
            console.error('Error deleting test users:', error);
            throw error;
          } finally {
            await prisma.$disconnect();
          }
        }
      });
    },
  },
});
