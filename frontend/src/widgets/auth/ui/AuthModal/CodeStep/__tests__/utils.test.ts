import { afterEach, describe, expect, it, vi } from 'vitest'

import { formatTime, secondsUntil } from '../utils'

describe('secondsUntil', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('округляет оставшееся время до целых секунд вверх', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    expect(secondsUntil(Date.parse('2026-01-01T00:01:00.500Z'))).toBe(61)
  })

  it('не уходит в минус, когда срок кода уже прошёл', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:02:00.000Z'))

    expect(secondsUntil(Date.parse('2026-01-01T00:01:00.000Z'))).toBe(0)
  })
})

describe('formatTime', () => {
  it('показывает минуты и секунды с ведущим нулём', () => {
    expect(formatTime(65)).toBe('1:05')
    expect(formatTime(0)).toBe('0:00')
  })
})
