export const toBool = (value: unknown, fallback = false) => {
  if (value === undefined || value === null) return fallback
  return value === true || value === 1 || value === '1'
}
