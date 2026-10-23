import { describe, expect, it } from 'vitest'

import { toBool } from '../toBool'

describe('toBool', () => {
  it('считает true / 1 / "1" истиной', () => {
    expect(toBool(true)).toBe(true)
    expect(toBool(1)).toBe(true)
    expect(toBool('1')).toBe(true)
  })

  it('считает остальные значения ложью', () => {
    expect(toBool(false)).toBe(false)
    expect(toBool(0)).toBe(false)
    expect(toBool('0')).toBe(false)
    expect(toBool('yes')).toBe(false)
  })

  it('для null/undefined использует fallback', () => {
    expect(toBool(null)).toBe(false)
    expect(toBool(undefined)).toBe(false)
    expect(toBool(null, true)).toBe(true)
    expect(toBool(undefined, true)).toBe(true)
  })
})
