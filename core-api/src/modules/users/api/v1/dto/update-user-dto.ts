import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator'
import { Role } from 'src/modules/auth/application/auth.types'
import { EMAIL_EXAMPLE } from 'shared/utils/email/constants'
import { normalizeEmail } from 'shared/utils/email/email'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone/constants'
import { IsBelarusianPhoneNumber } from 'shared/validation/is-belarusian-phone-number.decorator'

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value

const ROLE_NAMES = [Role.USER, Role.ADMIN]

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 'John', nullable: true })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(100)
  firstName?: string | null

  @ApiPropertyOptional({ example: 'Doe', nullable: true })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(100)
  lastName?: string | null

  @ApiPropertyOptional({
    example: BELARUSIAN_PHONE_EXAMPLE,
    description: 'New login phone. Sessions of this user are revoked',
  })
  @IsOptional()
  @IsBelarusianPhoneNumber()
  phoneNumber?: string

  @ApiPropertyOptional({
    example: EMAIL_EXAMPLE,
    nullable: true,
    description: 'Confirmed email. Null clears it',
  })
  @IsOptional()
  @Transform(({ value }) => (value === null ? null : normalizeEmail(value)))
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString()
  @IsEmail({}, { message: 'Email must be a valid address' })
  email?: string | null

  @ApiPropertyOptional({
    example: [Role.USER],
    description: 'Replaces the current set of roles',
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsIn(ROLE_NAMES, { each: true })
  roles?: string[]
}
