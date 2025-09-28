import { BadRequestException } from '@nestjs/common';
import { FindUserWhere } from '../interfaces';

export const findUserCondition = ({ id, phoneNumber }: FindUserWhere) => {
  if (id) {
    return { id };
  } else if (phoneNumber) {
    return { phoneNumber };
  } else {
    throw new BadRequestException(
      'At least one identifier (id or phoneNumber) is required',
    );
  }
};
