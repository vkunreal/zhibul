import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UsersService } from 'src/modules/users/users.service'
import { PrismaService } from 'prisma/prisma.service'
import { User } from 'shared/models/User'
import {
  AuthCredentials,
  AuthRequestContext,
  AuthenticatedUser,
  TokenCouple,
} from './auth.types'
import {
  generateRefreshToken,
  hashToken,
  parseDurationToMs,
} from './token.utils'

@Injectable()
export class AuthService {
  private readonly accessExpiresIn: string
  private readonly refreshExpiresIn: string
  readonly accessMaxAgeMs: number
  readonly refreshMaxAgeMs: number

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    this.accessExpiresIn = configService.get<string>(
      'JWT_ACCESS_EXPIRES_IN',
      '15m',
    )
    this.refreshExpiresIn = configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
      '30d',
    )
    this.accessMaxAgeMs = parseDurationToMs(this.accessExpiresIn)
    this.refreshMaxAgeMs = parseDurationToMs(this.refreshExpiresIn)
  }

  async auth(credentials: AuthCredentials, context: AuthRequestContext) {
    const candidate = await this.usersService.findUser({
      where: { phoneNumber: credentials.phoneNumber },
    })

    if (candidate) {
      return {
        ...(await this.login(credentials, candidate, context)),
        isUserCreated: false,
      }
    }

    return {
      ...(await this.signup(credentials, context)),
      isUserCreated: true,
    }
  }

  private async login(
    { password }: AuthCredentials,
    user: User,
    context: AuthRequestContext,
  ) {
    if (!(await compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid user credentials')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive')
    }

    return (await this.createSession(user.id, context)).tokens
  }

  private async signup(
    credentials: AuthCredentials,
    context: AuthRequestContext,
  ) {
    const newUser = await this.usersService.createUser(credentials)

    if (!newUser) {
      throw new NotFoundException()
    }

    return (await this.createSession(newUser.id, context)).tokens
  }

  async refreshTokens(refreshToken: string, context: AuthRequestContext) {
    const tokenHash = hashToken(refreshToken)
    const session = await this.prisma.session.findUnique({
      where: { tokenHash },
    })

    if (
      !session ||
      session.revokedAt ||
      session.expiresAt.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const issued = await this.createSession(session.userId, context)

    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        revokedAt: new Date(),
        replacedById: issued.sessionId,
      },
    })

    return issued.tokens
  }

  async logout(sessionId: string) {
    await this.prisma.session.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }

  async logoutAll(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }

  async assertActiveSession(
    sessionId: string,
    userId: string,
  ): Promise<AuthenticatedUser> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    })

    if (
      !session ||
      session.userId !== userId ||
      session.revokedAt ||
      session.expiresAt.getTime() <= Date.now() ||
      !session.user.isActive
    ) {
      throw new UnauthorizedException()
    }

    return {
      id: session.userId,
      sessionId: session.id,
      roles: session.user.roles.map(({ role }) => role.name),
    }
  }

  private async createSession(
    userId: string,
    context: AuthRequestContext,
  ): Promise<{ tokens: TokenCouple; sessionId: string }> {
    const refreshToken = generateRefreshToken()
    const session = await this.prisma.session.create({
      data: {
        userId,
        tokenHash: hashToken(refreshToken),
        expiresAt: new Date(Date.now() + this.refreshMaxAgeMs),
        userAgent: context.userAgent,
        ip: context.ip,
      },
    })

    const accessToken = await this.jwtService.signAsync(
      { sub: userId, sid: session.id },
      {
        expiresIn: this.accessExpiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
      },
    )

    return {
      sessionId: session.id,
      tokens: { accessToken, refreshToken },
    }
  }
}
