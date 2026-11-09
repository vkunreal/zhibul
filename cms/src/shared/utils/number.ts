/** Пустая строка → `null`, иначе число из строки. */
export const toNullableNumber = (value: string) =>
  value.trim() ? Number(value) : null

/** Положительный id из параметра роута, иначе `null`. */
export const toPositiveId = (value: string | undefined) => {
  const id = Number(value)
  if (!Number.isFinite(id) || id <= 0) return null
  return id
}
