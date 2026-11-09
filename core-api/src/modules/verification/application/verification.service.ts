import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'prisma/prisma.service'
import { parseDurationToMs } from 'shared/utils/duration/duration'
import { hashToken } from 'shared/utils/hash/hash'
import { CodeDeliveryService } from '../infrastructure/code-delivery.service'
import { VerificationFailedException } from './verification.errors'
import {
  ConsumeCodeOptions,
  IssueCodeOptions,
  IssuedCode,
} from './verification.types'

// Доставка ещё не сделана, поэтому каждый выданный код — эта заглушка.
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

  // Вызывающий отвечает обычными метаданными кода, ничего не выдавая,
  // чтобы «нет такого аккаунта» не отличалось от «код отправлен».
  describeCode(): IssuedCode {
    return {
      ttl: this.maxAgeMs / 1000,
      length: this.length,
    }
  }

  async issueCode(options: IssueCodeOptions): Promise<IssuedCode> {
    const { channel, purpose, destination, userId } = options
    // TODO: генерировать случайный код, когда появится доставка
    const code = STUB_CODE
    const expiresAt = new Date(Date.now() + this.maxAgeMs)

    // Новый код для того же адресата и цели заменяет предыдущий
    // и заодно сбрасывает флаг использования и счётчик попыток.
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
      // Условное обновление: параллельные попытки не проталкивают счётчик выше потолка.
      const { count } = await this.prisma.verificationCode.updateMany({
        where: { id: record.id, attempts: { lt: this.maxAttempts } },
        data: { attempts: { increment: 1 } },
      })

      if (count === 0) {
        throw new VerificationFailedException(
          'Too many invalid attempts, request a new code',
        )
      }

      throw new VerificationFailedException('Invalid code')
    }

    // Условное обновление не даёт двум параллельным запросам потратить один код.
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
