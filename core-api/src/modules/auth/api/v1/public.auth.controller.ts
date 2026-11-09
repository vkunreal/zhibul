import { Controller, Get, Post, Res } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'
import { ApiTag } from 'src/swagger/api-tags'
import { AuthService } from '../../application/auth.service'
import type { AuthenticatedUser } from '../../application/auth.types'
import { clearAuthCookies } from './auth-cookies'
import { Auth } from './decorators/auth.decorator'
import { CurrentUser } from './decorators/current-user.decorator'

@ApiTags(ApiTag.publicAuth)
@ApiCookieAuth('accessToken')
@Controller('public/v1/auth')
export class PublicAuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @Post('logout')
  @ApiOperation({ summary: 'Revoke current session' })
  async logout(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.sessionId)
    clearAuthCookies(res)
  }

  @Auth()
  @Post('logout-all')
  @ApiOperation({ summary: 'Revoke all sessions for the current user' })
  async logoutAll(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutAll(user.id)
    clearAuthCookies(res)
  }

  @Auth()
  @Get('me')
  @ApiOperation({ summary: 'Current authenticated user' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return user
  }
}
