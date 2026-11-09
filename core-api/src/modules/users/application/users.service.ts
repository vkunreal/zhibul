import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { User, UserWithRoles } from 'shared/models/User'
import { paginate } from 'shared/utils/pagination/page'
import { Role } from 'src/modules/auth/application/auth.types'
import { revokeOpenSessions } from 'src/modules/auth/application/utils/revoke-open-sessions'
import { CreateUserDTO } from '../api/v1/dto/create-user-dto'
import { ListUsersQueryDTO } from '../api/v1/dto/list-users-query-dto'
import { UpdateUserDTO } from '../api/v1/dto/update-user-dto'
import { userWithRolesInclude } from './db/user-include'
import { CreateUserOptions, FindUserOptions } from './users.types'
import { findUserCondition } from './utils/find-user-condition'
import { transformUserWithRoles } from './utils/transform-user-with-role'
import { userUpdateData } from './utils/user-update-data'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(options: FindUserOptions) {
    try {
      const { where, withRoles } = options

      if (withRoles) {
        const user = await this.prisma.user.findUnique({
          where: findUserCondition(where),
          include: userWithRolesInclude,
        })

        if (!user) return null

        return transformUserWithRoles(user)
      }

      const user = await this.prisma.user.findUnique({
        where: findUserCondition(where),
      })

      return user
    } catch (e) {
      if (e instanceof BadRequestException) throw e

      throw new InternalServerErrorException()
    }
  }

  async listUsers(query: ListUsersQueryDTO, url: string) {
    const page = await paginate(
      this.prisma.user,
      {
        where: this.listWhere(query),
        include: userWithRolesInclude,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      },
      url,
      query,
    )

    return {
      ...page,
      items: page.items.map((user) => transformUserWithRoles(user)),
    }
  }

  async getUser(id: string) {
    return this.requireUser(id)
  }

  async createUser(
    createUserDTO: CreateUserDTO,
    options: CreateUserOptions & { withRoles: true },
  ): Promise<UserWithRoles>
  async createUser(
    createUserDTO: CreateUserDTO,
    options?: CreateUserOptions,
  ): Promise<User>
  async createUser(
    createUserDTO: CreateUserDTO,
    options: CreateUserOptions = {},
  ): Promise<User | UserWithRoles> {
    const {
      phoneNumber,
      firstName,
      lastName,
      roles = ['USER'],
      isActive = true,
    } = createUserDTO
    const { withRoles = false, phoneConfirmedAt } = options

    try {
      const roleRecords = await this.resolveRoleRecords(roles)

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

      const user = await this.findUser({ where: { id: userId }, withRoles })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      return user
    } catch (e) {
      this.rethrow(e, 'Failed to create user')
    }
  }

  async updateUser(id: string, dto: UpdateUserDTO, actorId: string) {
    const current = await this.requireUser(id)

    if (id === actorId && dto.roles && !dto.roles.includes(Role.ADMIN)) {
      throw new BadRequestException('You cannot remove your own admin role')
    }

    const { data, phoneChanged } = userUpdateData(dto, current)

    const roleRecords = dto.roles
      ? await this.resolveRoleRecords(dto.roles)
      : null

    if (Object.keys(data).length === 0 && !roleRecords) {
      return current
    }

    try {
      await this.prisma.$transaction(async (prisma) => {
        if (Object.keys(data).length > 0) {
          await prisma.user.update({ where: { id }, data })
        }

        if (roleRecords) {
          await prisma.userRole.deleteMany({ where: { userId: id } })
          await prisma.userRole.createMany({
            data: roleRecords.map((role) => ({
              userId: id,
              roleId: role.id,
            })),
          })
        }

        // Телефон — это логин, поэтому открытые сессии отзываются.
        if (phoneChanged) {
          await revokeOpenSessions(prisma, id)
        }
      })
    } catch (e) {
      this.rethrow(e, 'Failed to update user')
    }

    return this.requireUser(id)
  }

  async deleteUser(id: string, actorId: string) {
    await this.requireUser(id)

    if (id === actorId) {
      throw new BadRequestException('You cannot delete your own account')
    }

    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (e) {
      this.rethrow(e, 'Failed to delete user')
    }
  }

  async blockUser(id: string, actorId: string) {
    await this.requireUser(id)

    if (id === actorId) {
      throw new BadRequestException('You cannot block your own account')
    }

    return this.setActive(id, false)
  }

  // Публичный профиль называет это удалением. Строка остаётся, чтобы номер
  // нельзя было зарегистрировать снова, а вход по-прежнему отклонял аккаунт.
  async deactivateUser(id: string) {
    await this.requireUser(id)

    await this.setActive(id, false)
  }

  async unblockUser(id: string) {
    await this.requireUser(id)

    return this.setActive(id, true)
  }

  private async setActive(id: string, isActive: boolean) {
    try {
      await this.prisma.$transaction([
        this.prisma.user.update({ where: { id }, data: { isActive } }),
        // `isActive` уже роняет следующий запрос, но refresh-токен всё ещё
        // открыл бы новую сессию. Отзываем их, чтобы заблокированный аккаунт
        // не продлевал доступ.
        ...(isActive ? [] : [revokeOpenSessions(this.prisma, id)]),
      ])
    } catch (e) {
      this.rethrow(e, 'Failed to update user')
    }

    return this.requireUser(id)
  }

  private listWhere(query: ListUsersQueryDTO): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {}

    if (query.isActive !== undefined) {
      where.isActive = query.isActive
    }

    const search = query.search?.trim()

    if (search) {
      where.OR = [
        { phoneNumber: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ]
    }

    return where
  }

  private async requireUser(id: string): Promise<UserWithRoles> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: userWithRolesInclude,
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return transformUserWithRoles(user)
  }

  private async resolveRoleRecords(names: string[]) {
    const uniqueNames = [...new Set(names)]
    const roleRecords = await this.prisma.role.findMany({
      where: { name: { in: uniqueNames } },
    })

    if (roleRecords.length !== uniqueNames.length) {
      const found = new Set(roleRecords.map(({ name }) => name))
      const missing = uniqueNames.filter((role) => !found.has(role))

      throw new NotFoundException(`Roles not found: ${missing.join(', ')}`)
    }

    return roleRecords
  }

  private rethrow(e: unknown, fallback: string): never {
    if (
      e instanceof NotFoundException ||
      e instanceof ConflictException ||
      e instanceof BadRequestException
    ) {
      throw e
    }

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ConflictException(this.uniqueConflictMessage(e))
      }

      if (e.code === 'P2025') {
        throw new NotFoundException('User not found')
      }
    }

    throw new InternalServerErrorException(fallback)
  }

  private uniqueConflictMessage(e: Prisma.PrismaClientKnownRequestError) {
    const target = e.meta?.target
    const fields = (
      Array.isArray(target)
        ? target
        : typeof target === 'string'
          ? [target]
          : []
    ).map((field) => String(field).toLowerCase())

    if (fields.some((field) => field.includes('email'))) {
      return 'Email is already in use'
    }

    if (fields.some((field) => field.includes('phone'))) {
      return 'User with this phone number already exists'
    }

    return 'User already exists'
  }
}
