import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateUserDTO } from '../api/v1/dto/create-user-dto'
import { Prisma } from 'prisma/client'
import { CreateUserOptions, FindUserOptions } from './users.types'
import { findUserCondition } from './find-user-condition'
import { transformUserWithRoles } from './transform-user-with-role'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(options: FindUserOptions) {
    try {
      const { where, withRoles } = options

      if (withRoles) {
        const user = await this.prisma.user.findUnique({
          where: findUserCondition(where),
          include: {
            roles: {
              include: {
                role: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        })

        if (!user) return null

        return transformUserWithRoles(user)
      }

      const user = await this.prisma.user.findUnique({
        where: findUserCondition(where),
      })

      return user
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async createUser(
    createUserDTO: CreateUserDTO,
    options: CreateUserOptions = {},
  ) {
    const {
      phoneNumber,
      firstName,
      lastName,
      roles = ['USER'],
      isActive = true,
    } = createUserDTO
    const { withRoles = false, phoneConfirmedAt } = options

    try {
      const roleRecords = await this.prisma.role.findMany({
        where: {
          name: { in: roles },
        },
      })

      if (roleRecords.length !== roles.length) {
        const foundRoleNames = roleRecords.map(({ name }) => name)
        const missingRoles = roles.filter((role) =>
          foundRoleNames.includes(role),
        )

        throw new NotFoundException(
          `Roles not found: ${missingRoles.join(', ')}`,
        )
      }

      const userId = await this.prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            phoneNumber,
            phoneConfirmedAt,
            firstName,
            lastName,
            isActive,
          },
        })

        if (roleRecords.length > 0) {
          await prisma.userRole.createMany({
            data: roleRecords.map((role) => ({
              userId: newUser.id,
              roleId: role.id,
            })),
            skipDuplicates: true,
          })
        }

        return newUser.id
      })

      return this.findUser({ where: { id: userId }, withRoles })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(
            'User with this phone number already exists',
          )
        }

        if (e instanceof NotFoundException) {
          throw e
        }

        throw new InternalServerErrorException('Failed to create user')
      }
    }
  }
}
