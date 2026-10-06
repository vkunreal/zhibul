import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'prisma/prisma.service'
import { parseDurationToMs } from 'shared/utils/duration'
import { hashToken } from 'shared/utils/hash'
import { CodeDeliveryService } from '../infrastructure/code-delivery.service'
import { VerificationFailedException } from './verification.errors'
import {
  ConsumeCodeOptions,
  IssueCodeOptions,
  IssuedCode,
} from './verification.types'

// Delivery is not implemented yet, so every issued code is this stub.
const STUB_CODE = '000000'

@Injectable()
export class VerificationService {
  private readonly expiresIn: string
  private readonly length: number
  private readonly maxAttempts: number
  private readonly maxAgeMs: number

  constructor(
    private readonly prisma: PrismaService,
    private readonly codeDelivery: CodeDeliveryService,
    configService: ConfigService,
  ) {
    this.expiresIn = configService.get<string>('AUTH_CODE_EXPIRES_IN', '10m')
    this.length = configService.get<number>('AUTH_CODE_LENGTH', 6)
    this.maxAttempts = configService.get<number>('AUTH_CODE_MAX_ATTEMPTS', 5)
    this.maxAgeMs = parseDurationToMs(this.expiresIn)
  }

  // Lets a caller answer with the usual code metadata without issuing anything,
  // so that "no such account" is indistinguishable from "code sent".
  describeCode(): IssuedCode {
    return {
      ttl: this.maxAgeMs / 1000,
      length: this.length,
    }
  }

  async issueCode(options: IssueCodeOptions): Promise<IssuedCode> {
    const { channel, purpose, destination, userId } = options
    // TODO: generate a random code once delivery is in place
    const code = STUB_CODE
    const expiresAt = new Date(Date.now() + this.maxAgeMs)

    // Requesting a new code replaces the previous one for the same destination
    // and purpose, which also resets its used flag and attempt counter.
    await this.prisma.verificationCode.upsert({
      where: { destination_purpose: { destination, purpose } },
      create: {
        channel,
        purpose,
        destination,
        userId,
        codeHash: hashToken(code),
        expiresAt,
      },
      update: {
        channel,
        userId,
        codeHash: hashToken(code),
        expiresAt,
        isUsed: false,
        attempts: 0,
      },
    })

    this.codeDelivery.deliver(channel, destination, code)

    return this.describeCode()
  }

  async consumeCode(options: ConsumeCodeOptions) {
    const { purpose, destination, code, userId } = options
    const record = await this.prisma.verificationCode.findUnique({
      where: { destination_purpose: { destination, purpose } },
    })

    if (!record || (userId && record.userId !== userId)) {
      throw new VerificationFailedException('Code was not requested')
    }

    if (record.isUsed) {
      throw new VerificationFailedException('Code has already been used')
    }

    if (record.expiresAt.getTime() <= Date.now()) {
      throw new VerificationFailedException('Code has expired')
    }

    if (record.attempts >= this.maxAttempts) {
      throw new VerificationFailedException(
        'Too many invalid attempts, request a new code',
      )
    }

    if (record.codeHash !== hashToken(code)) {
      await this.prisma.verificationCode.update({
        where: { id: record.id },
        data: { attempts: { increment: 1 } },
      })

      throw new VerificationFailedException('Invalid code')
    }

    // Conditional update keeps two parallel requests from consuming one code.
    const { count } = await this.prisma.verificationCode.updateMany({
      where: { id: record.id, isUsed: false },
      data: { isUsed: true },
    })

    if (count === 0) {
      throw new VerificationFailedException('Code has already been used')
    }

    return record
  }
}
