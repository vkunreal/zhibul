export const EMAIL_EXAMPLE = 'john@example.com'

// Addresses are stored lowercased, so "John@Example.com" and "john@example.com"
// resolve to the same user and cannot both occupy the unique index.
export const normalizeEmail = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value
