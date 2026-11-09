import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator'
import { Role } from 'src/modules/auth/application/auth.types'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone/constants'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'

const ROLE_NAMES = [Role.USER, Role.ADMIN]

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
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsIn(ROLE_NAMES, { each: true })
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
