import { allSettled, fork } from 'effector'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { requestMeFx, signInFx } from '@/entities/auth'

import { signInStarted } from '../index'

import { $authScreen, $closeRequested, AuthScreen } from '../../screen'
import { codeIssued } from '../../session'

// Настоящий waitSignInFx, время запроса задаётся таймером.

const scopeWithRequestTime = async (requestMs: number, status: number) => {
  const scope = fork({
    handlers: [
      [
        signInFx,
        () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (status === 200) resolve({ status, data: undefined })
              else reject({ status })
            }, requestMs)
          }),
      ],
      [requestMeFx, async () => ({ status: 200, data: { id: '1' } })],
    ],
  })

  await allSettled(codeIssued, {
    scope,
    params: { phone: '+375 (29) 111-11-11', issued: { ttl: 60, length: 6 } },
  })

  return scope
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('длительность экрана загрузки', () => {
  it.each([
    [300, 1500],
    [1500, 1500],
    [2000, 2000],
  ])(
    'запрос за %i мс — загрузка %i мс, затем модалка закрывается',
    async (requestMs, loadingMs) => {
      const scope = await scopeWithRequestTime(requestMs, 200)

      const launch = allSettled(signInStarted, { scope, params: '123456' })

      await vi.advanceTimersByTimeAsync(loadingMs - 1)
      expect(scope.getState($authScreen)).toBe(AuthScreen.success)
      expect(scope.getState($closeRequested)).toBe(false)

      await vi.advanceTimersByTimeAsync(1)
      expect(scope.getState($closeRequested)).toBe(true)

      await launch
    },
  )

  it.each([
    [300, 1500],
    [2000, 2000],
  ])(
    'неудачный запрос за %i мс — загрузка %i мс, затем экран ошибки',
    async (requestMs, loadingMs) => {
      const scope = await scopeWithRequestTime(requestMs, 401)

      const launch = allSettled(signInStarted, { scope, params: '000000' })

      await vi.advanceTimersByTimeAsync(loadingMs - 1)
      expect(scope.getState($authScreen)).toBe(AuthScreen.success)

      await vi.advanceTimersByTimeAsync(1)
      expect(scope.getState($authScreen)).toBe(AuthScreen.error)

      await launch
    },
  )
})
