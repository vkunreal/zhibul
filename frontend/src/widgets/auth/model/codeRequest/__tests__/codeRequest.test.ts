import { allSettled, fork } from 'effector'
import { describe, expect, it, vi } from 'vitest'

import { deferred, flushPromises } from '@/shared/lib/testing'

import { CodeRequest, phoneSubmitted, requestCodeFx } from '../index'

import { authFlowReset } from '../../lifecycle'
import { $authScreen, AuthScreen } from '../../screen'
import { $codeSession, IssuedCode } from '../../session'

const PHONE = '+375 (29) 111-11-11'
const issued = { ttl: 60, length: 6 }

type CodeResponse = { status: number; data: IssuedCode | null }

const okResponse: CodeResponse = { status: 200, data: issued }

const scopeWith = (handler: (params: CodeRequest) => Promise<CodeResponse>) =>
  fork({ handlers: [[requestCodeFx, handler]] })

const failingWith = (error: unknown) =>
  scopeWith(async () => {
    throw error
  })

describe('запрос SMS', () => {
  it('отправляет в API только цифры, сохраняя маску и номер попытки в params', async () => {
    const handler = vi.fn(async () => okResponse)
    const scope = scopeWith(handler)

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(handler).toHaveBeenCalledWith({
      phone: PHONE,
      phoneNumber: '375291111111',
      attempt: 1,
    })
  })

  it('после выдачи SMS открывает шаг кода и заполняет сессию', async () => {
    const scope = scopeWith(async () => okResponse)

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.code)
    expect(scope.getState($codeSession)).toMatchObject({ phone: PHONE, issued })
  })

  it('ответ без данных не открывает шаг кода', async () => {
    const scope = scopeWith(async () => ({ status: 200, data: null }))

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })
})

describe('ошибки запроса SMS', () => {
  it.each([501, 502, 503])('статус %i открывает экран ошибки', async (status) => {
    const scope = failingWith({ status })

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.error)
  })

  it.each([400, 429, 500])('статус %i оставляет форму телефона', async (status) => {
    const scope = failingWith({ status })

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('обрыв сети оставляет форму телефона', async () => {
    const scope = failingWith(new TypeError('Failed to fetch'))

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('после ошибки номер можно отправить снова', async () => {
    const handler = vi
      .fn<(params: CodeRequest) => Promise<CodeResponse>>()
      .mockRejectedValueOnce({ status: 400 })
      .mockResolvedValueOnce(okResponse)
    const scope = scopeWith(handler)

    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(handler).toHaveBeenCalledTimes(2)
    expect(scope.getState($authScreen)).toBe(AuthScreen.code)
  })
})

describe('защита от двойного сабмита', () => {
  it('пока SMS запрашивается, повторная отправка номера игнорируется', async () => {
    const response = deferred<CodeResponse>()
    const handler = vi.fn(() => response.promise)
    const scope = scopeWith(handler)

    const first = allSettled(phoneSubmitted, { scope, params: PHONE })
    const second = allSettled(phoneSubmitted, { scope, params: PHONE })
    response.resolve(okResponse)
    await Promise.all([first, second])

    expect(handler).toHaveBeenCalledTimes(1)
  })
})

describe('устаревшие ответы', () => {
  it('ответ, пришедший после сброса модалки, не открывает шаг кода', async () => {
    const response = deferred<CodeResponse>()
    const scope = scopeWith(() => response.promise)

    const request = allSettled(phoneSubmitted, { scope, params: PHONE })
    const reset = allSettled(authFlowReset, { scope })
    response.resolve(okResponse)
    await Promise.all([request, reset])

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
    expect(scope.getState($codeSession).phone).toBe('')
  })

  it('серверная ошибка после сброса модалки не открывает экран ошибки', async () => {
    const response = deferred<CodeResponse>()
    const scope = scopeWith(() => response.promise)

    const request = allSettled(phoneSubmitted, { scope, params: PHONE })
    const reset = allSettled(authFlowReset, { scope })
    response.reject({ status: 502 })
    await Promise.all([request, reset])

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('сброс разрешает новую отправку, и старый ответ не снимает её ожидание', async () => {
    const stale = deferred<CodeResponse>()
    const fresh = deferred<CodeResponse>()
    const handler = vi
      .fn<(params: CodeRequest) => Promise<CodeResponse>>()
      .mockReturnValueOnce(stale.promise)
      .mockReturnValueOnce(fresh.promise)
    const scope = scopeWith(handler)

    const launches = [
      allSettled(phoneSubmitted, { scope, params: PHONE }),
      allSettled(authFlowReset, { scope }),
      allSettled(phoneSubmitted, { scope, params: PHONE }),
    ]

    stale.resolve(okResponse)
    await flushPromises()
    // Свежий запрос ещё идёт — третья отправка должна игнорироваться.
    launches.push(allSettled(phoneSubmitted, { scope, params: PHONE }))

    fresh.resolve(okResponse)
    await Promise.all(launches)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler).toHaveBeenLastCalledWith(
      expect.objectContaining({ attempt: 3 }),
    )
    expect(scope.getState($authScreen)).toBe(AuthScreen.code)
  })
})
