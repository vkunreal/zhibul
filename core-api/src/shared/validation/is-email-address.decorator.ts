import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { normalizeEmail } from 'shared/utils/email'

export const IsEmailAddress = () =>
  applyDecorators(
    IsNotEmpty({ message: 'Email must be not empty' }),
    IsString({ message: 'Email must be a string' }),
    Transform(({ value }) => normalizeEmail(value)),
    IsEmail({}, { message: 'Email must be a valid address' }),
  )
