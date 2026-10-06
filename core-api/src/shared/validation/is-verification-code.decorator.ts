import { applyDecorators } from '@nestjs/common'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export const VERIFICATION_CODE_EXAMPLE = '000000'

export const IsVerificationCode = () =>
  applyDecorators(
    IsNotEmpty({ message: 'Code must be not empty' }),
    IsString({ message: 'Code must be a string' }),
    Matches(/^\d{6}$/, { message: 'Code must be 6 digits' }),
  )
