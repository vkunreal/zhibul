import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get()
  getData() {
    return 'Test'
  }
}
