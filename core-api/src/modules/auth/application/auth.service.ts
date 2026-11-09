import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { VerificationChannel, VerificationPurpose } from 'prisma/client'
import { UsersService } from 'src/modules/users/application/users.service'
import { VerificationFailedException } from 'src/modules/verification/application/verification.errors'
import { VerificationService } from 'src/modules/verification/application/verification.service'
import { PrismaService } from 'prisma/prisma.service'
import { parseDurationToMs } from 'shared/utils/duration/duration'
import { Duration } from 'shared/utils/duration/interfaces'
import { generateSecureToken, hashToken } from 'shared/utils/hash/hash'
import { User } from 'shared/models/User'
import {
  AuthCredentials,
  AuthRequestContext,
  AuthenticatedUser,
  TokenCouple,
} from './auth.types'
import { revokeOpenSessions } from './utils/revoke-open-sessions'

@Injectable()
export class AuthService {
  private readonly accessExpiresIn: Duration
  private readonly refreshExpiresIn: Duration
  readonly accessMaxAgeMs: number
  readonly refreshMaxAgeMs: number

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly verification: VerificationService,
    configService: ConfigService,
  ) {
    this.accessExpiresIn = configService.get<Duration>(
      'JWT_ACCESS_EXPIRES_IN',
      '15m',
    )
    this.refreshExpiresIn = configService.get<Duration>(
      'JWT_REFRESH_EXPIRES_IN',
      '30d',
    )
    this.accessMaxAgeMs = parseDurationToMs(this.accessExpiresIn)
    this.refreshMaxAgeMs = parseDurationToMs(this.refreshExpiresIn)
  }

  async getAuthCode(phoneNumber: string) {
    return this.verification.issueCode({
      channel: VerificationChannel.PHONE,
      purpose: VerificationPurpose.LOGIN,
      destination: phoneNumber,
    })
  }

  async auth(credentials: AuthCredentials, context: AuthRequestContext) {
    try {
      await this.verification.consumeCode({
        purpose: VerificationPurpose.LOGIN,
        destination: credentials.phoneNumber,
        code: credentials.code,
      })
    } catch (e) {
      // Вход — единственный поток, где неверный код правда значит
      // «не авторизован», поэтому здесь остаётся 401, а не 400.
      if (e instanceof VerificationFailedException) {
        throw new UnauthorizedException(e.message)
      }

      throw e
    }

    const candidate = await this.usersService.findUser({
      where: { phoneNumber: credentials.phoneNumber },
    })

    if (candidate) {
      return {
        ...(await this.login(candidate, context)),
        isUserCreated: false,
      }
    }

    return {
      ...(await this.signup(credentials.phoneNumber, context)),
      isUserCreated: true,
    }
  }

  private async login(user: User, context: AuthRequestContext) {
    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive')
    }

    // Пользователи из сида и созданные вне регистрации до этого момента
    // не доказывали, что номер принадлежит им.
    if (!user.phoneConfirmedAt) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { phoneConfirmedAt: new Date() },
      })
    }

    return (await this.createSession(user.id, context)).tokens
  }

  private async signup(phoneNumber: string, context: AuthRequestContext) {
    const newUser = await this.usersService.createUser(
      { phoneNumber },
      { phoneConfirmedAt: new Date() },
    )

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
    await revokeOpenSessions(this.prisma, userId)
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

  async createSession(
    userId: string,
    context: AuthRequestContext,
  ): Promise<{ tokens: TokenCouple; sessionId: string }> {
    const refreshToken = generateSecureToken()
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
      { expiresIn: this.accessExpiresIn },
    )

    return {
      sessionId: session.id,
      tokens: { accessToken, refreshToken },
    }
  }
}
