import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
})
const prisma = new PrismaClient({ adapter })

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

  console.log('Seeding admin users...')

  const adminUsers = [
    {
      phoneNumber: '375291234567',
      firstName: 'Admin',
      lastName: 'Root',
      roles: ['ADMIN', 'USER'],
    },
  ]

  for (const admin of adminUsers) {
    const roleRecords = await prisma.role.findMany({
      where: { name: { in: admin.roles } },
    })

    const user = await prisma.user.upsert({
      where: { phoneNumber: admin.phoneNumber },
      update: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        isActive: true,
      },
      create: {
        phoneNumber: admin.phoneNumber,
        firstName: admin.firstName,
        lastName: admin.lastName,
        isActive: true,
      },
    })

    await prisma.userRole.createMany({
      data: roleRecords.map((role) => ({
        userId: user.id,
        roleId: role.id,
      })),
      skipDuplicates: true,
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
