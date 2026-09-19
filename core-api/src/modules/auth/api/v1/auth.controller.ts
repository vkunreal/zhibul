import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { AuthService } from '../../application/auth.service'
import type { AuthenticatedUser } from '../../application/auth.types'
import {
  REFRESH_TOKEN_COOKIE,
  clearAuthCookies,
  setAuthCookies,
} from './auth-cookies'
import { Auth } from './decorators/auth.decorator'
import { CurrentUser } from './decorators/current-user.decorator'
import { AuthUserDTO } from './dto/auth-user.dto'

@ApiTags('auth')
@Controller('v1/auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login or sign up by phone number' })
  @ApiResponse({ status: 200, description: 'Existing user authorized' })
  @ApiResponse({ status: 201, description: 'New user created and authorized' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async auth(
    @Body() dto: AuthUserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const existingRefresh = req.cookies?.[REFRESH_TOKEN_COOKIE] as
      string | undefined

    if (existingRefresh) {
      try {
        await this.refresh(req, res)
        return res.status(HttpStatus.OK).json({
          status: true,
          isUserCreated: false,
        })
      } catch {
        // refresh cookie invalid/expired — fall through to login/signup
      }
    }

    const { accessToken, refreshToken, isUserCreated } =
      await this.authService.auth(dto, this.requestContext(req))

    setAuthCookies(
      res,
      { accessToken, refreshToken },
      this.authService.accessMaxAgeMs,
      this.authService.refreshMaxAgeMs,
    )

    return res.status(isUserCreated ? HttpStatus.CREATED : HttpStatus.OK).json({
      status: true,
      isUserCreated,
    })
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rotate session and refresh tokens' })
  @ApiResponse({ status: 200, description: 'Tokens updated' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined

    if (!oldToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const tokens = await this.authService.refreshTokens(
      oldToken,
      this.requestContext(req),
    )

    setAuthCookies(
      res,
      tokens,
      this.authService.accessMaxAgeMs,
      this.authService.refreshMaxAgeMs,
    )

    return { status: true }
  }

  @Auth()
  @Post('logout')
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: 'Revoke current session' })
  async logout(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.sessionId)
    clearAuthCookies(res)
    return { status: true }
  }

  @Auth()
  @Post('logout-all')
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: 'Revoke all sessions for the current user' })
  async logoutAll(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutAll(user.id)
    clearAuthCookies(res)
    return { status: true }
  }

  @Auth()
  @Get('me')
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: 'Current authenticated user' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return user
  }

  private requestContext(req: Request) {
    const forwarded = req.headers['x-forwarded-for']
    const ip =
      typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : req.ip

    return {
      ip,
      userAgent: req.headers['user-agent'],
    }
  }
}
