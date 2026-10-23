import { describe, expect, it } from 'vitest'

import { toNullableNumber, toPositiveId } from '../number'

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

describe('toPositiveId', () => {
  it('возвращает положительный id', () => {
    expect(toPositiveId('12')).toBe(12)
  })

  it('отбрасывает пустое, нулевое и нечисловое значение', () => {
    expect(toPositiveId(undefined)).toBeNull()
    expect(toPositiveId('0')).toBeNull()
    expect(toPositiveId('-3')).toBeNull()
    expect(toPositiveId('abc')).toBeNull()
  })
})
