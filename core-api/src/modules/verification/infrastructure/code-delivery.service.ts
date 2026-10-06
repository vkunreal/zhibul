import { Injectable, Logger } from '@nestjs/common'
import { VerificationChannel } from 'prisma/client'

@Injectable()
export class CodeDeliveryService {
  private readonly logger = new Logger(CodeDeliveryService.name)

  // TODO: send over an SMS gateway and an SMTP transport
  deliver(channel: VerificationChannel, destination: string, code: string) {
    this.logger.log(`${channel} code for ${destination}: ${code}`)
  }
}
