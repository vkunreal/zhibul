import { describe, expect, it } from 'vitest'

import { isServerError } from '../isServerError'

describe('isServerError', () => {
  it('считает сбоем ответ со статусом больше 500', () => {
    expect(isServerError({ status: 502 })).toBe(true)
    expect(isServerError({ status: 503 })).toBe(true)
  })

  it('не считает сбоем клиентские ответы и обрыв сети', () => {
    expect(isServerError({ status: 500 })).toBe(false)
    expect(isServerError({ status: 400 })).toBe(false)
    expect(isServerError(new TypeError('Load failed'))).toBe(false)
  })
})
