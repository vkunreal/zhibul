import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from 'src/modules/users/users.module'
import { VerificationModule } from 'src/modules/verification/verification.module'
import { PublicAuthControllerV1 } from './api/v1/public.auth.controller'
import { UnauthAuthControllerV1 } from './api/v1/unauth.auth.controller'
import { UnauthRecoveryControllerV1 } from './api/v1/unauth.recovery.controller'
import { AuthGuard } from './api/v1/guards/auth.guard'
import { AdminGuard } from './api/v1/guards/zones/admin.guard'
import { PublicGuard } from './api/v1/guards/zones/public.guard'
import { UnauthGuard } from './api/v1/guards/zones/unauth.guard'
import { AccountRecoveryService } from './application/account-recovery.service'
import { AuthService } from './application/auth.service'
import { AuthJwtModule } from './infrastructure/jwt.module'

@Module({
  imports: [AuthJwtModule, PrismaModule, UsersModule, VerificationModule],
  providers: [
    AuthService,
    AccountRecoveryService,
    UnauthGuard,
    PublicGuard,
    AdminGuard,
    AuthGuard,
  ],
  controllers: [
    PublicAuthControllerV1,
    UnauthAuthControllerV1,
    UnauthRecoveryControllerV1,
  ],
  exports: [AuthGuard, AuthService, AuthJwtModule],
})
export class AuthModule {}
