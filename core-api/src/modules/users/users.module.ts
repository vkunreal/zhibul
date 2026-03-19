import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthGuard } from 'src/modules/auth/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
