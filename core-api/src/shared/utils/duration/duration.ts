const DURATION_UNITS: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
}

export const parseDurationToMs = (value: string) => {
  const match = /^(\d+)(s|m|h|d)$/.exec(value)

  if (!match) {
    throw new Error(`Invalid duration format: ${value}`)
  }

  const amount = Number(match[1])
  const unit = match[2]

  return amount * DURATION_UNITS[unit]
}
