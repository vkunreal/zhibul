import { describe, expect, it } from 'vitest'

import { remainingLoadingMs } from '../utils'

describe('remainingLoadingMs', () => {
  it('добирает анимацию до полутора секунд, если ответ пришёл раньше', () => {
    expect(remainingLoadingMs(1_000, 1_200)).toBe(1300)
  })

  it('держит всю анимацию, если ответ пришёл мгновенно', () => {
    expect(remainingLoadingMs(1_000, 1_000)).toBe(1500)
  })

  it('не держит модалку, если запрос шёл ровно полторы секунды или дольше', () => {
    expect(remainingLoadingMs(1_000, 2_500)).toBe(0)
    expect(remainingLoadingMs(1_000, 2_600)).toBe(0)
  })
})
