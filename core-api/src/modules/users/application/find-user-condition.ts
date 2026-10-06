import { BadRequestException } from '@nestjs/common'
import { FindUserWhere } from './users.types'

export const findUserCondition = ({
  id,
  phoneNumber,
  email,
}: FindUserWhere) => {
  if (id) {
    return { id }
  } else if (phoneNumber) {
    return { phoneNumber }
  } else if (email) {
    return { email }
  } else {
    throw new BadRequestException(
      'At least one identifier (id, phoneNumber or email) is required',
    )
  }
}
