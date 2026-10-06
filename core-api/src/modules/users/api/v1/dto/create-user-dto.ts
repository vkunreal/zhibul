import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'

export class CreateUserDTO {
  @ApiProperty({
    description: "User's phone number",
    example: BELARUSIAN_PHONE_EXAMPLE,
  })
  @IsBelarusianPhoneNumber()
  phoneNumber: string

  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string

  @ApiPropertyOptional({
    description: 'Role names to assign to user',
    example: ['USER'],
    default: ['USER'],
  })
  @IsArray()
  @IsOptional()
  roles?: string[]

  @ApiPropertyOptional({
    description: 'Is user active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
