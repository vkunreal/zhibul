import { Module } from '@nestjs/common'
import { VerificationModule } from 'src/modules/verification/verification.module'
import { ProfileControllerV1 } from './api/v1/profile.controller'
import { UsersControllerV1 } from './api/v1/users.controller'
import { ProfileService } from './application/profile.service'
import { UsersService } from './application/users.service'

@Module({
  imports: [VerificationModule],
  controllers: [UsersControllerV1, ProfileControllerV1],
  providers: [UsersService, ProfileService],
  exports: [UsersService, ProfileService],
})
export class UsersModule {}
