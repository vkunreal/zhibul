import { describe, expect, it } from 'vitest'

import { digitsOnly } from '../utils'

describe('digitsOnly', () => {
  it('убирает маску телефона', () => {
    expect(digitsOnly('+375 (29) 111-11-11')).toBe('375291111111')
  })

  it('не меняет номер, в котором уже только цифры', () => {
    expect(digitsOnly('375291111111')).toBe('375291111111')
  })

  it('возвращает пустую строку, если цифр нет', () => {
    expect(digitsOnly('+ ( ) -')).toBe('')
  })
})
