import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hashSync('123456', 12);
  const user = await prisma.user.upsert({
    where: { email: 'mvdb0207@gmail.com' },
    update: {},
    create: {
      name: 'Mathijs van den Berg',
      email: 'mvdb0207@gmail.com',
      role: 'SUPER_ADMIN',
      password: password,
    },
  });
  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
