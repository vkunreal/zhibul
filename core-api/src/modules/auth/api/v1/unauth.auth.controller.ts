import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { ApiTag } from 'src/swagger/api-tags'
import { AuthService } from '../../application/auth.service'
import { REFRESH_TOKEN_COOKIE, setAuthCookies } from './auth-cookies'
import { AuthUserDTO } from './dto/auth-user.dto'
import { GetAuthCodeDTO } from './dto/get-auth-code-dto'
import { IssuedCodeDTO } from './dto/issued-code.dto'
import { requestContext } from './request-context'

@ApiTags(ApiTag.unauthAuth)
@Controller('unauth/v1/auth')
export class UnauthAuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Post('getAuthCode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get auth code' })
  @ApiResponse({ status: 200, type: IssuedCodeDTO })
  @ApiResponse({ status: 400, description: 'Invalid phone number' })
  async getAuthCode(@Body() dto: GetAuthCodeDTO) {
    const authCode = await this.authService.getAuthCode(dto.phoneNumber)

    return authCode
  }

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
    const { accessToken, refreshToken, isUserCreated } =
      await this.authService.auth(dto, requestContext(req))

    setAuthCookies(
      res,
      { accessToken, refreshToken },
      this.authService.accessMaxAgeMs,
      this.authService.refreshMaxAgeMs,
    )

    return res.status(isUserCreated ? HttpStatus.CREATED : HttpStatus.OK).json({
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
      requestContext(req),
    )

    setAuthCookies(
      res,
      tokens,
      this.authService.accessMaxAgeMs,
      this.authService.refreshMaxAgeMs,
    )
  }
}
