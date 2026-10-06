import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma, VerificationChannel, VerificationPurpose } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { VerificationService } from 'src/modules/verification/application/verification.service'
import { ProfileResponseDTO } from '../api/v1/dto/profile-response-dto'
import { UpdateProfileDTO } from '../api/v1/dto/update-profile-dto'
import { toProfileResponse } from './to-profile-response'

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly verification: VerificationService,
  ) {}

  async getProfile(userId: string): Promise<ProfileResponseDTO> {
    return toProfileResponse(await this.requireUser(userId))
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDTO,
  ): Promise<ProfileResponseDTO> {
    await this.requireUser(userId)

    await this.prisma.user.update({
      where: { id: userId },
      data: { firstName: dto.firstName, lastName: dto.lastName },
    })

    return this.getProfile(userId)
  }

  async requestEmailConfirmation(userId: string, email: string) {
    const user = await this.requireUser(userId)

    if (user.email === email && user.emailConfirmedAt) {
      throw new ConflictException('Email is already confirmed')
    }

    await this.assertEmailIsFree(email, userId)

    // The address waits in `pendingEmail` until the code comes back, so an
    // unconfirmed address never occupies the unique `email` index.
    await this.prisma.user.update({
      where: { id: userId },
      data: { pendingEmail: email },
    })

    return this.verification.issueCode({
      channel: VerificationChannel.EMAIL,
      purpose: VerificationPurpose.CONFIRM_EMAIL,
      destination: email,
      userId,
    })
  }

  async confirmEmail(userId: string, code: string) {
    const user = await this.requireUser(userId)

    if (!user.pendingEmail) {
      throw new BadRequestException('No email is awaiting confirmation')
    }

    await this.verification.consumeCode({
      purpose: VerificationPurpose.CONFIRM_EMAIL,
      destination: user.pendingEmail,
      code,
      userId,
    })

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          email: user.pendingEmail,
          pendingEmail: null,
          emailConfirmedAt: new Date(),
        },
      })
    } catch (e) {
      throw this.asConflict(e, 'Email is already in use')
    }

    return this.getProfile(userId)
  }

  async requestPhoneChange(userId: string, phoneNumber: string) {
    const user = await this.requireUser(userId)

    if (user.phoneNumber === phoneNumber) {
      throw new ConflictException('This is already your phone number')
    }

    await this.assertPhoneNumberIsFree(phoneNumber)

    return this.verification.issueCode({
      channel: VerificationChannel.PHONE,
      purpose: VerificationPurpose.CHANGE_PHONE,
      destination: phoneNumber,
      userId,
    })
  }

  async confirmPhoneChange(
    userId: string,
    phoneNumber: string,
    code: string,
    keepSessionId?: string,
  ) {
    await this.verification.consumeCode({
      purpose: VerificationPurpose.CHANGE_PHONE,
      destination: phoneNumber,
      code,
      userId,
    })

    await this.applyPhoneChange(userId, phoneNumber, keepSessionId)

    return this.getProfile(userId)
  }

  // Shared with access recovery, where the caller has no session to keep.
  async applyPhoneChange(
    userId: string,
    phoneNumber: string,
    keepSessionId?: string,
  ) {
    try {
      await this.prisma.$transaction([
        this.prisma.user.update({
          where: { id: userId },
          data: { phoneNumber, phoneConfirmedAt: new Date() },
        }),
        // The phone number is the login identity, so every other session has
        // to go: it may belong to whoever held the old number.
        this.prisma.session.updateMany({
          where: {
            userId,
            revokedAt: null,
            ...(keepSessionId ? { id: { not: keepSessionId } } : {}),
          },
          data: { revokedAt: new Date() },
        }),
      ])
    } catch (e) {
      throw this.asConflict(e, 'Phone number is already in use')
    }
  }

  private async requireUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: { select: { name: true } } } } },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  private async assertEmailIsFree(email: string, userId: string) {
    const owner = await this.prisma.user.findUnique({ where: { email } })

    if (owner && owner.id !== userId) {
      throw new ConflictException('Email is already in use')
    }
  }

  private async assertPhoneNumberIsFree(phoneNumber: string) {
    const owner = await this.prisma.user.findUnique({ where: { phoneNumber } })

    if (owner) {
      throw new ConflictException('Phone number is already in use')
    }
  }

  private asConflict(e: unknown, message: string) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return new ConflictException(message)
    }

    return e
  }
}
