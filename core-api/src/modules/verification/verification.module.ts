import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { VerificationService } from './application/verification.service'
import { CodeDeliveryService } from './infrastructure/code-delivery.service'

@Module({
  imports: [PrismaModule],
  providers: [VerificationService, CodeDeliveryService],
  exports: [VerificationService],
})
export class VerificationModule {}
