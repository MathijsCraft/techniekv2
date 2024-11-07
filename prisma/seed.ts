import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = hashSync('rZ?kA(61@42+', 12);
  const user = await prisma.user.upsert({
    where: { email: 'mike_oscar1@hotmail.com' },
    update: {},
    create: {
      name: 'Mike Verkaik',
      email: 'mike_oscar1@hotmail.com',
      role: 'TEAM',
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
