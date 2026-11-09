import { Prisma } from 'prisma/client'

export const userWithRolesInclude = {
  roles: {
    include: {
      role: {
        select: { name: true },
      },
    },
  },
} satisfies Prisma.UserInclude
