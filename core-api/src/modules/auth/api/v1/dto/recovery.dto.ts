import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { EMAIL_EXAMPLE } from 'shared/utils/email'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'
import { IsEmailAddress } from 'shared/validation/is-email-address.decorator'
import {
  IsVerificationCode,
  VERIFICATION_CODE_EXAMPLE,
} from 'shared/validation/is-verification-code.decorator'

export class RecoveryEmailDTO {
  @ApiProperty({
    description: 'Confirmed email of the account',
    example: EMAIL_EXAMPLE,
  })
  @IsEmailAddress()
  email!: string
}

export class VerifyRecoveryEmailDTO extends RecoveryEmailDTO {
  @ApiProperty({
    description: 'Code from the email',
    example: VERIFICATION_CODE_EXAMPLE,
  })
  @IsVerificationCode()
  code!: string
}

export class RecoveryPhoneDTO {
  @ApiProperty({ description: 'Ticket issued after the email step' })
  @IsNotEmpty({ message: 'Recovery token must be not empty' })
  @IsString({ message: 'Recovery token must be a string' })
  recoveryToken!: string

  @ApiProperty({
    description: 'New phone number',
    example: BELARUSIAN_PHONE_EXAMPLE,
  })
  @IsBelarusianPhoneNumber()
  phoneNumber!: string
}

export class ConfirmRecoveryPhoneDTO extends RecoveryPhoneDTO {
  @ApiProperty({
    description: 'Code from SMS',
    example: VERIFICATION_CODE_EXAMPLE,
  })
  @IsVerificationCode()
  code!: string
}
