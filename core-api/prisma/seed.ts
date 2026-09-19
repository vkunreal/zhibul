import 'dotenv/config'
import { hash } from 'bcrypt'
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
      phoneNumber: '+79991234567',
      password: 'admin12345',
      name: 'Admin',
      roles: ['ADMIN', 'USER'],
    },
  ]

  for (const admin of adminUsers) {
    const passwordHash = await hash(admin.password, 12)
    const roleRecords = await prisma.role.findMany({
      where: { name: { in: admin.roles } },
    })

    const user = await prisma.user.upsert({
      where: { phoneNumber: admin.phoneNumber },
      update: {
        passwordHash,
        name: admin.name,
        isActive: true,
      },
      create: {
        phoneNumber: admin.phoneNumber,
        passwordHash,
        name: admin.name,
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
