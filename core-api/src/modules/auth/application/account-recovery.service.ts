import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VerificationChannel, VerificationPurpose } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { ProfileService } from 'src/modules/users/application/profile.service'
import { VerificationService } from 'src/modules/verification/application/verification.service'
import { parseDurationToMs } from 'shared/utils/duration/duration'
import { generateSecureToken, hashToken } from 'shared/utils/hash/hash'
import { AuthService } from './auth.service'
import { AuthRequestContext } from './auth.types'

// Восстановление для тех, кто войти не может, поэтому сессии здесь нет.
// Подтверждённая почта — единственное, что стоит между запросом и сменой
// телефона, оттого каждый шаг нарочно узкий.
@Injectable()
export class AccountRecoveryService {
  private readonly ticketExpiresIn: string
  private readonly ticketMaxAgeMs: number

  constructor(
    private readonly prisma: PrismaService,
    private readonly verification: VerificationService,
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    this.ticketExpiresIn = configService.get<string>(
      'RECOVERY_TICKET_EXPIRES_IN',
      '15m',
    )
    this.ticketMaxAgeMs = parseDurationToMs(this.ticketExpiresIn)
  }

  async requestEmailCode(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    // Ответ одинаковый, есть адрес или нет, чтобы по этой ручке
    // нельзя было перебирать аккаунты.
    if (user?.emailConfirmedAt && user.isActive) {
      return this.verification.issueCode({
        channel: VerificationChannel.EMAIL,
        purpose: VerificationPurpose.RECOVER_ACCESS,
        destination: email,
        userId: user.id,
      })
    }

    return this.verification.describeCode()
  }

  async verifyEmailCode(email: string, code: string) {
    const record = await this.verification.consumeCode({
      purpose: VerificationPurpose.RECOVER_ACCESS,
      destination: email,
      code,
    })

    if (!record.userId) {
      throw new UnauthorizedException('Recovery is not available')
    }

    const recoveryToken = generateSecureToken()

    await this.prisma.recoveryTicket.create({
      data: {
        userId: record.userId,
        tokenHash: hashToken(recoveryToken),
        expiresAt: new Date(Date.now() + this.ticketMaxAgeMs),
      },
    })

    return { recoveryToken, expiresIn: this.ticketExpiresIn }
  }

  async requestPhoneCode(recoveryToken: string, phoneNumber: string) {
    const ticket = await this.requireTicket(recoveryToken)

    return this.profileService.requestPhoneChange(ticket.userId, phoneNumber)
  }

  async confirmPhone(
    recoveryToken: string,
    phoneNumber: string,
    code: string,
    context: AuthRequestContext,
  ) {
    const ticket = await this.requireTicket(recoveryToken)

    await this.verification.consumeCode({
      purpose: VerificationPurpose.CHANGE_PHONE,
      destination: phoneNumber,
      code,
      userId: ticket.userId,
    })

    // Сессию не сохраняем: каждое устройство со старым номером теряет
    // доступ раньше, чем новый номер получит свою сессию.
    await this.profileService.applyPhoneChange(ticket.userId, phoneNumber)

    await this.prisma.recoveryTicket.update({
      where: { id: ticket.id },
      data: { usedAt: new Date() },
    })

    return (await this.authService.createSession(ticket.userId, context)).tokens
  }

  private async requireTicket(recoveryToken: string) {
    const ticket = await this.prisma.recoveryTicket.findUnique({
      where: { tokenHash: hashToken(recoveryToken) },
      include: { user: { select: { isActive: true } } },
    })

    if (
      !ticket ||
      ticket.usedAt ||
      ticket.expiresAt.getTime() <= Date.now() ||
      !ticket.user.isActive
    ) {
      throw new UnauthorizedException('Invalid or expired recovery token')
    }

    return ticket
  }
}
