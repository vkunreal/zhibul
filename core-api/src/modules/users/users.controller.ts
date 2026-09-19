import { Controller, Get } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'
import { Auth } from 'src/modules/auth/api/v1/decorators/auth.decorator'
import { Role } from 'src/modules/auth/application/auth.types'

@Controller('users')
@ApiCookieAuth('accessToken')
export class UsersController {
  @Auth(Role.ADMIN)
  @Get()
  getData() {
    return 'Test'
  }
}
