// Belarusian numbers are the country code 375 followed by 9 digits.
export const BELARUSIAN_PHONE_PATTERN = /^375\d{9}$/

export const BELARUSIAN_PHONE_EXAMPLE = '375447861303'

// Phone numbers are stored and looked up without the leading "+", so that
// "+375447861303" and "375447861303" resolve to the same user.
export const normalizePhoneNumber = (value: unknown) =>
  typeof value === 'string' ? value.trim().replace(/^\+/, '') : value
