import { Controller, Get } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/modules/auth/api/v1/decorators/auth.decorator'
import { Role } from 'src/modules/auth/application/auth.types'

@ApiTags('users')
@Controller('v1/users')
@ApiCookieAuth('accessToken')
export class UsersControllerV1 {
  @Auth(Role.ADMIN)
  @Get()
  getData() {
    return 'Test'
  }
}
