import { describe, expect, it } from 'vitest'

import { toNullableNumber } from './number'

describe('toNullableNumber', () => {
  it('возвращает null для пустой и пробельной строки', () => {
    expect(toNullableNumber('')).toBeNull()
    expect(toNullableNumber('   ')).toBeNull()
  })

  it('парсит число из строки', () => {
    expect(toNullableNumber('42')).toBe(42)
    expect(toNullableNumber(' 3.5 ')).toBe(3.5)
  })
})
