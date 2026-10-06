import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/modules/auth/api/v1/decorators/auth.decorator'
import { CurrentUser } from 'src/modules/auth/api/v1/decorators/current-user.decorator'
import { IssuedCodeDTO } from 'src/modules/auth/api/v1/dto/issued-code.dto'
import type { AuthenticatedUser } from 'src/modules/auth/application/auth.types'
import { ProfileService } from '../../application/profile.service'
import { ChangeEmailDTO, ConfirmEmailDTO } from './dto/change-email-dto'
import { ChangePhoneDTO, ConfirmPhoneDTO } from './dto/change-phone-dto'
import { ProfileResponseDTO } from './dto/profile-response-dto'
import { UpdateProfileDTO } from './dto/update-profile-dto'

@ApiTags('profile')
@ApiCookieAuth('accessToken')
@Auth()
@Controller('v1/users/me')
export class ProfileControllerV1 {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Current user profile' })
  @ApiResponse({ status: 200, type: ProfileResponseDTO })
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.getProfile(user.id)
  }

  @Patch()
  @ApiOperation({ summary: 'Update first and last name' })
  @ApiResponse({ status: 200, type: ProfileResponseDTO })
  updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProfileDTO,
  ) {
    return this.profileService.updateProfile(user.id, dto)
  }

  @Post('email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a confirmation code to an email address' })
  @ApiResponse({ status: 200, description: 'Code sent', type: IssuedCodeDTO })
  @ApiResponse({ status: 409, description: 'Email is already in use' })
  requestEmailConfirmation(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangeEmailDTO,
  ) {
    return this.profileService.requestEmailConfirmation(user.id, dto.email)
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm the pending email address' })
  @ApiResponse({ status: 200, type: ProfileResponseDTO })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  confirmEmail(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ConfirmEmailDTO,
  ) {
    return this.profileService.confirmEmail(user.id, dto.code)
  }

  @Post('phone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a code to a new phone number' })
  @ApiResponse({ status: 200, description: 'Code sent', type: IssuedCodeDTO })
  @ApiResponse({ status: 409, description: 'Phone number is already in use' })
  requestPhoneChange(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePhoneDTO,
  ) {
    return this.profileService.requestPhoneChange(user.id, dto.phoneNumber)
  }

  @Post('phone/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Confirm the new phone number and revoke other sessions',
  })
  @ApiResponse({ status: 200, type: ProfileResponseDTO })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  confirmPhoneChange(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ConfirmPhoneDTO,
  ) {
    return this.profileService.confirmPhoneChange(
      user.id,
      dto.phoneNumber,
      dto.code,
      user.sessionId,
    )
  }
}
