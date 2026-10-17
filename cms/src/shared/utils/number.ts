/** Пустая строка → `null`, иначе число из строки. */
export const toNullableNumber = (value: string) =>
  value.trim() ? Number(value) : null
