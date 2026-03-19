import { AuthService } from './auth.service'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthUserDTO } from './data/dto/auth-user-dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import type { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: "User's authorization" })
  @ApiResponse({
    status: 200,
    description: 'Success user authorization (user was)',
  })
  @ApiResponse({
    status: 201,
    description: 'Success user authorization (user have created)',
  })
  @ApiResponse({ status: 401, description: "Invalid user's credentials" })
  @ApiResponse({ status: 500, description: 'Server error' })
  async auth(@Body() authUserDTO: AuthUserDTO, @Res() res: Response) {
    const { accessToken, refreshToken, isUserCreated } =
      await this.authService.auth(authUserDTO)

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.cookie('refreshToken', refreshToken, { httpOnly: true })

    return res.status(isUserCreated ? HttpStatus.CREATED : HttpStatus.OK).json({
      status: true,
    })
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Update tokens' })
  @ApiResponse({
    status: 200,
    description: 'Tokens have been successfuly updated',
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Res({ passthrough: true }) res: Response) {
    const oldToken = res.req.cookies.refreshToken

    if (!oldToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(oldToken)

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.cookie('refreshToken', refreshToken, { httpOnly: true })

    return { status: true }
  }
}
