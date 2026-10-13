import { allSettled, fork } from 'effector'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { requestMeFx, signInFx } from '@/entities/auth'

import { deferred } from '@/shared/lib/testing'

import { signInStarted, SignInWait, waitSignInFx } from '../index'

import { authFlowReset } from '../../lifecycle'
import { $authScreen, $closeRequested, AuthScreen } from '../../screen'
import { codeIssued } from '../../session'

const PHONE = '+375 (29) 111-11-11'
const OTP = '123456'
const NOW = 1_000_000

type SignInBody = { phoneNumber: string; code: string }
type SignInResponse = { status: number; data: undefined }
type SignInHandler = (body: SignInBody) => Promise<SignInResponse>

const ok: SignInResponse = { status: 200, data: undefined }

/** Скоуп на шаге кода: SMS уже выдана, анимация не ждёт реального времени. */
const scopeOnCodeStep = async (
  signIn: SignInHandler,
  wait = vi.fn(async (params: SignInWait) => params),
) => {
  const scope = fork({
    handlers: [
      [signInFx, signIn],
      [requestMeFx, async () => ({ status: 200, data: { id: '1' } })],
      [waitSignInFx, wait],
    ],
  })

  await allSettled(codeIssued, {
    scope,
    params: { phone: PHONE, issued: { ttl: 60, length: 6 } },
  })

  return scope
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('отправка кода', () => {
  it('уходит с номером без маски и кодом', async () => {
    const signIn = vi.fn<SignInHandler>(async () => ok)
    const scope = await scopeOnCodeStep(signIn)

    await allSettled(signInStarted, { scope, params: OTP })

    expect(signIn).toHaveBeenCalledWith({
      phoneNumber: '375291111111',
      code: OTP,
    })
  })

  it('сразу показывает анимацию, не дожидаясь ответа', async () => {
    const response = deferred<SignInResponse>()
    const scope = await scopeOnCodeStep(() => response.promise)

    const launch = allSettled(signInStarted, { scope, params: OTP })

    expect(scope.getState($authScreen)).toBe(AuthScreen.success)
    expect(scope.getState($closeRequested)).toBe(false)

    response.resolve(ok)
    await launch
  })

  it('пока идёт вход, повторная отправка кода игнорируется', async () => {
    const response = deferred<SignInResponse>()
    const signIn = vi.fn<SignInHandler>(() => response.promise)
    const scope = await scopeOnCodeStep(signIn)

    const first = allSettled(signInStarted, { scope, params: OTP })
    const second = allSettled(signInStarted, { scope, params: OTP })
    response.resolve(ok)
    await Promise.all([first, second])

    expect(signIn).toHaveBeenCalledTimes(1)
  })
})

describe('итог входа', () => {
  it('после ответа 200 закрывает модалку', async () => {
    const scope = await scopeOnCodeStep(async () => ok)

    await allSettled(signInStarted, { scope, params: OTP })

    expect(scope.getState($closeRequested)).toBe(true)
    expect(scope.getState($authScreen)).toBe(AuthScreen.success)
  })

  it('другой успешный статус считает неудачей и показывает ошибку', async () => {
    const scope = await scopeOnCodeStep(async () => ({
      status: 204,
      data: undefined,
    }))

    await allSettled(signInStarted, { scope, params: OTP })

    expect(scope.getState($authScreen)).toBe(AuthScreen.error)
    expect(scope.getState($closeRequested)).toBe(false)
  })

  it.each([
    ['неверный код', { status: 401 }],
    ['ошибка сервера', { status: 502 }],
    ['обрыв сети', new TypeError('Failed to fetch')],
  ])('%s показывает экран ошибки', async (_, error) => {
    const scope = await scopeOnCodeStep(async () => {
      throw error
    })

    await allSettled(signInStarted, { scope, params: OTP })

    expect(scope.getState($authScreen)).toBe(AuthScreen.error)
    expect(scope.getState($closeRequested)).toBe(false)
  })

  it('передаёт анимации момент старта, номер попытки и успех ответа', async () => {
    const wait = vi.fn(async (params: SignInWait) => params)
    const response = deferred<SignInResponse>()
    const scope = await scopeOnCodeStep(() => response.promise, wait)

    const launch = allSettled(signInStarted, { scope, params: OTP })
    vi.setSystemTime(NOW + 400)
    response.resolve(ok)
    await launch

    expect(wait).toHaveBeenCalledWith({ startedAt: NOW, attempt: 1, ok: true })
  })

  it('не закрывает модалку, пока анимация не закончилась', async () => {
    const animation = deferred<SignInWait>()
    const wait = vi.fn(() => animation.promise)
    const scope = await scopeOnCodeStep(async () => ok, wait)

    const launch = allSettled(signInStarted, { scope, params: OTP })
    await vi.waitFor(() => expect(wait).toHaveBeenCalled())

    expect(scope.getState($closeRequested)).toBe(false)

    animation.resolve({ startedAt: NOW, attempt: 1, ok: true })
    await launch

    expect(scope.getState($closeRequested)).toBe(true)
  })
})

describe('устаревшие результаты', () => {
  it('успех, пришедший после сброса модалки, не закрывает новую модалку', async () => {
    const response = deferred<SignInResponse>()
    const scope = await scopeOnCodeStep(() => response.promise)

    const launch = allSettled(signInStarted, { scope, params: OTP })
    const reset = allSettled(authFlowReset, { scope })
    response.resolve(ok)
    await Promise.all([launch, reset])

    expect(scope.getState($closeRequested)).toBe(false)
    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('вход не из модалки не запускает анимацию', async () => {
    const wait = vi.fn(async (params: SignInWait) => params)
    const scope = await scopeOnCodeStep(async () => ok, wait)

    await allSettled(signInFx, {
      scope,
      params: { phoneNumber: '375291111111', code: OTP },
    })

    expect(wait).not.toHaveBeenCalled()
    expect(scope.getState($closeRequested)).toBe(false)
  })
})
