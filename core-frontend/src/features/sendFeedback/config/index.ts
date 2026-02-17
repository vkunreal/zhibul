export const FIELDS_CONFIGURATION = {
  name: {
    required: 'Имя обязательно',
    minLength: {
      value: 2,
      message: 'Минимум 2 символа',
    },
    maxLength: {
      value: 20,
      message: 'Имя не должно превышать 20 символов',
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
      message: 'Имя может содержать только буквы и дефисы',
    },
  },
  phone: {
    required: 'Телефон обязателен',
    validate: (value: string) => {
      const unmasked = value.replace(/\D/g, '')
      return unmasked.length === 12 || 'Введите полный номер'
    },
  },
  email: {
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Введите корректный email адрес',
    },
  },
} as const
