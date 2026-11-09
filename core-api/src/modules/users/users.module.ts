import { Module } from '@nestjs/common'
import { VerificationModule } from 'src/modules/verification/verification.module'
import { AdminUsersControllerV1 } from './api/v1/admin.users.controller'
import { PublicUsersControllerV1 } from './api/v1/public.users.controller'
import { ProfileService } from './application/profile.service'
import { UsersService } from './application/users.service'

@Module({
  imports: [VerificationModule],
  controllers: [AdminUsersControllerV1, PublicUsersControllerV1],
  providers: [UsersService, ProfileService],
  exports: [UsersService, ProfileService],
})
export class UsersModule {}
