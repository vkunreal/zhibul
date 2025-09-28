import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDTO } from './data/dto/create-user-dto'
import { hash } from 'bcrypt'
import { Prisma } from '@prisma/client'
import { FindUserOptions, UserWithRolesRaw } from './interfaces'
import { findUserCondition } from './utils/findUserCondition'
import { transformUserWithRoles } from './utils/transformUserWithRole'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(options: FindUserOptions) {
    try {
      const { where, withRoles } = options

      const baseQuery: Prisma.UserFindUniqueArgs = {
        where: findUserCondition(where),
      }

      if (withRoles) {
        baseQuery.include = {
          roles: {
            include: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        }
      }

      const user = await this.prisma.user.findUnique(baseQuery)

      if (!user) return null

      return withRoles ? transformUserWithRoles(user as UserWithRolesRaw) : user
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async createUser(createUserDTO: CreateUserDTO, withRoles = false) {
    const {
      phoneNumber,
      password,
      name,
      roles = ['USER'],
      isActive = true,
    } = createUserDTO

    try {
      const passwordHash = await hash(password, 12)

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
            passwordHash,
            name,
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
