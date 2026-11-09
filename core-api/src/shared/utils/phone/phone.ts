// Номера хранятся и ищутся без ведущего «+», чтобы "+375447861303"
// и "375447861303" находили одного пользователя.
export const normalizePhoneNumber = (value: unknown) =>
  typeof value === 'string' ? value.trim().replace(/^\+/, '') : value
