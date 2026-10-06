import { ApiProperty } from '@nestjs/swagger'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'
import {
  IsVerificationCode,
  VERIFICATION_CODE_EXAMPLE,
} from 'shared/validation/is-verification-code.decorator'

export class AuthUserDTO {
  @IsBelarusianPhoneNumber()
  @ApiProperty({
    description: "User's phone number",
    example: BELARUSIAN_PHONE_EXAMPLE,
    nullable: false,
  })
  phoneNumber!: string

  @IsVerificationCode()
  @ApiProperty({
    description: 'Auth code from SMS',
    example: VERIFICATION_CODE_EXAMPLE,
    nullable: false,
  })
  code!: string
}
