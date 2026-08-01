import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@acres.org.sg' },
    update: {},
    create: {
      email: 'admin@acres.org.sg',
      name: 'Admin User',
      passwordHash,
      role: 'ADMIN',
    },
  })

  const rescuer = await prisma.user.upsert({
    where: { email: 'rescuer@acres.org.sg' },
    update: {},
    create: {
      email: 'rescuer@acres.org.sg',
      name: 'Field Rescuer',
      passwordHash,
      role: 'RESCUER',
    },
  })

  console.log({ admin, rescuer })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
