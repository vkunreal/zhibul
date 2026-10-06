import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from 'src/modules/users/users.module'
import { VerificationModule } from 'src/modules/verification/verification.module'
import { AuthControllerV1 } from './api/v1/auth.controller'
import { RecoveryControllerV1 } from './api/v1/recovery.controller'
import { AuthGuard } from './api/v1/guards/auth.guard'
import { AccountRecoveryService } from './application/account-recovery.service'
import { AuthService } from './application/auth.service'
import { AuthJwtModule } from './infrastructure/jwt.module'

@Module({
  imports: [AuthJwtModule, PrismaModule, UsersModule, VerificationModule],
  providers: [AuthService, AccountRecoveryService, AuthGuard],
  controllers: [AuthControllerV1, RecoveryControllerV1],
  exports: [AuthGuard, AuthService, AuthJwtModule],
})
export class AuthModule {}
