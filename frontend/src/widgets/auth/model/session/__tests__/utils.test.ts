import { describe, expect, it } from 'vitest'

import { codeExpiresAt } from '../utils'

describe('codeExpiresAt', () => {
  it('прибавляет время жизни кода в секундах к текущему моменту', () => {
    expect(codeExpiresAt(10_000, 60)).toBe(70_000)
  })

  it('при нулевом времени жизни возвращает текущий момент', () => {
    expect(codeExpiresAt(10_000, 0)).toBe(10_000)
  })
})
