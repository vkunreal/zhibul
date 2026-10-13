import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { waitSignInFx } from '../effects'

const NOW = 10_000

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('waitSignInFx', () => {
  it('ждёт остаток полутора секунд от старта анимации', async () => {
    const wait = { startedAt: NOW - 200, attempt: 1, ok: true }
    const onDone = vi.fn()

    void waitSignInFx(wait).then(onDone)

    await vi.advanceTimersByTimeAsync(1299)
    expect(onDone).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(onDone).toHaveBeenCalledWith(wait)
  })

  it('отвечает сразу, если запрос шёл дольше полутора секунд', async () => {
    const wait = { startedAt: NOW - 2_000, attempt: 2, ok: false }
    const onDone = vi.fn()

    void waitSignInFx(wait).then(onDone)
    await vi.advanceTimersByTimeAsync(0)

    expect(onDone).toHaveBeenCalledWith(wait)
  })
})
