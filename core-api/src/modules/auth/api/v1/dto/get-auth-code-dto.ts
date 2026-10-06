import { ApiProperty } from '@nestjs/swagger'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'

export class GetAuthCodeDTO {
  @IsBelarusianPhoneNumber()
  @ApiProperty({
    description: "User's phone number",
    example: BELARUSIAN_PHONE_EXAMPLE,
    nullable: false,
  })
  phoneNumber!: string
}
