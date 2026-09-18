import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/modules/auth/auth.guard'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get()
  getData() {
    return 'Test'
  }
}
