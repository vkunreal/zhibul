import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import {
  BELARUSIAN_PHONE_EXAMPLE,
  BELARUSIAN_PHONE_PATTERN,
  normalizePhoneNumber,
} from 'shared/utils/phone'

export const IsBelarusianPhoneNumber = () =>
  applyDecorators(
    IsNotEmpty({ message: "User's phone number must be not empty" }),
    IsString({ message: "User's phone number must be a string" }),
    Transform(({ value }) => normalizePhoneNumber(value)),
    Matches(BELARUSIAN_PHONE_PATTERN, {
      message: `User's phone number must be Belarusian, e.g. ${BELARUSIAN_PHONE_EXAMPLE}`,
    }),
  )
