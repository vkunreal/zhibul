import { ApiProperty } from '@nestjs/swagger'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'
import {
  IsVerificationCode,
  VERIFICATION_CODE_EXAMPLE,
} from 'shared/validation/is-verification-code.decorator'

export class ChangePhoneDTO {
  @ApiProperty({
    description: 'New phone number',
    example: BELARUSIAN_PHONE_EXAMPLE,
  })
  @IsBelarusianPhoneNumber()
  phoneNumber!: string
}

export class ConfirmPhoneDTO extends ChangePhoneDTO {
  @ApiProperty({
    description: 'Code from SMS',
    example: VERIFICATION_CODE_EXAMPLE,
  })
  @IsVerificationCode()
  code!: string
}
