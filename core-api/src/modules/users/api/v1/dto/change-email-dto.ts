import { ApiProperty } from '@nestjs/swagger'
import { EMAIL_EXAMPLE } from 'shared/utils/email'
import { IsEmailAddress } from 'shared/validation/is-email-address.decorator'
import {
  IsVerificationCode,
  VERIFICATION_CODE_EXAMPLE,
} from 'shared/validation/is-verification-code.decorator'

export class ChangeEmailDTO {
  @ApiProperty({ description: 'Email to confirm', example: EMAIL_EXAMPLE })
  @IsEmailAddress()
  email!: string
}

export class ConfirmEmailDTO {
  @ApiProperty({
    description: 'Code from the email',
    example: VERIFICATION_CODE_EXAMPLE,
  })
  @IsVerificationCode()
  code!: string
}
