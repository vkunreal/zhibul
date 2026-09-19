import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from 'src/modules/users/users.module'
import { AuthControllerV1 } from './api/v1/auth.controller'
import { AuthGuard } from './api/v1/guards/auth.guard'
import { AuthService } from './application/auth.service'
import { AuthJwtModule } from './infrastructure/jwt.module'

@Module({
  imports: [AuthJwtModule, PrismaModule, UsersModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthControllerV1],
  exports: [AuthGuard, AuthService, AuthJwtModule],
})
export class AuthModule {}
