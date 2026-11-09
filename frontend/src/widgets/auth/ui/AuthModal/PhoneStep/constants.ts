import { RegisterOptions } from 'react-hook-form'

import { PhoneFormValues } from './interfaces'

const PHONE_LENGTH = 12

export const PHONE_RULES: RegisterOptions<PhoneFormValues, 'phone'> = {
  required: 'Телефон обязательно для заполнения',
  validate: (value: string) => {
    const unmasked = value.replace(/\D/g, '')

    return unmasked.length === PHONE_LENGTH || 'Введите полный номер'
  },
}
