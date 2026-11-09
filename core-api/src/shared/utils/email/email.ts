// Адреса хранятся в нижнем регистре, поэтому "John@Example.com" и
// "john@example.com" указывают на одного пользователя и не могут оба
// занять уникальный индекс.
export const normalizeEmail = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value
