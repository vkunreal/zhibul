import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding roles...')

  const roles = [
    {
      name: 'USER',
      description: 'Regular user',
      permissions: 'read:*',
    },
    {
      name: 'ADMIN',
      description: 'Administrator',
      permissions: 'create:*,read:*,update:*,delete:*',
    },
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
