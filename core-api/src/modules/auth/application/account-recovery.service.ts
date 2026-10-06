import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VerificationChannel, VerificationPurpose } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { ProfileService } from 'src/modules/users/application/profile.service'
import { VerificationService } from 'src/modules/verification/application/verification.service'
import { parseDurationToMs } from 'shared/utils/duration'
import { generateSecureToken, hashToken } from 'shared/utils/hash'
import { AuthService } from './auth.service'
import { AuthRequestContext } from './auth.types'

// Recovery is for people who cannot sign in at all, so none of it sits behind a
// session. The confirmed email is the only thing standing between a request and
// a phone number change, which is why every step is deliberately narrow.
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

    // The response is identical whether or not the address exists, so this
    // endpoint cannot be used to enumerate accounts.
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

    // No session is kept, so every device signed in with the old number loses
    // access before the new one gets a session.
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
