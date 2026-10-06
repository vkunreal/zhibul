import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { AccountRecoveryService } from '../../application/account-recovery.service'
import { AuthService } from '../../application/auth.service'
import { setAuthCookies } from './auth-cookies'
import { IssuedCodeDTO } from './dto/issued-code.dto'
import {
  ConfirmRecoveryPhoneDTO,
  RecoveryEmailDTO,
  RecoveryPhoneDTO,
  VerifyRecoveryEmailDTO,
} from './dto/recovery.dto'
import { requestContext } from './request-context'

@ApiTags('auth')
@Controller('v1/auth/recovery')
export class RecoveryControllerV1 {
  constructor(
    private readonly recoveryService: AccountRecoveryService,
    private readonly authService: AuthService,
  ) {}

  @Post('email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send a recovery code to the confirmed email of an account',
  })
  @ApiResponse({
    status: 200,
    description: 'Answered the same way whether or not the account exists',
    type: IssuedCodeDTO,
  })
  requestEmailCode(@Body() dto: RecoveryEmailDTO) {
    return this.recoveryService.requestEmailCode(dto.email)
  }

  @Post('email/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange the email code for a recovery token' })
  @ApiResponse({ status: 200, description: 'Recovery token issued' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  verifyEmailCode(@Body() dto: VerifyRecoveryEmailDTO) {
    return this.recoveryService.verifyEmailCode(dto.email, dto.code)
  }

  @Post('phone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a code to the new phone number' })
  @ApiResponse({ status: 200, description: 'Code sent', type: IssuedCodeDTO })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired recovery token',
  })
  @ApiResponse({ status: 409, description: 'Phone number is already in use' })
  requestPhoneCode(@Body() dto: RecoveryPhoneDTO) {
    return this.recoveryService.requestPhoneCode(
      dto.recoveryToken,
      dto.phoneNumber,
    )
  }

  @Post('phone/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Attach the new phone number and sign in on this device',
  })
  @ApiResponse({ status: 200, description: 'Phone number changed' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  async confirmPhone(
    @Body() dto: ConfirmRecoveryPhoneDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.recoveryService.confirmPhone(
      dto.recoveryToken,
      dto.phoneNumber,
      dto.code,
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
