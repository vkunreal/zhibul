import { allSettled, fork } from 'effector'
import { describe, expect, it, vi } from 'vitest'

import { requestMeFx, signInFx } from '@/entities/auth'

import {
  $authScreen,
  $authTitle,
  $closeRequested,
  $codeSession,
  authFlowReset,
  AuthScreen,
  backToPhone,
  phoneSubmitted,
  requestCodeFx,
  signInStarted,
  waitSignInFx,
} from '../index'

// Сквозные сценарии через публичный API модели, как его видит UI.
// Подробные случаи каждой части — в тестах её папки.

const PHONE = '+375 (29) 111-11-11'
const OTHER_PHONE = '+375 (33) 222-22-22'
const issued = { ttl: 60, length: 6 }

const createScope = (signInStatus = 200) =>
  fork({
    handlers: [
      [requestCodeFx, async () => ({ status: 200, data: issued })],
      [
        signInFx,
        async () => {
          if (signInStatus !== 200) throw { status: signInStatus }
          return { status: 200, data: undefined }
        },
      ],
      [requestMeFx, async () => ({ status: 200, data: { id: '1' } })],
      [waitSignInFx, async <T>(wait: T) => wait],
    ],
  })

describe('сценарий входа', () => {
  it('телефон → код → анимация → закрытие', async () => {
    const scope = createScope()

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
    expect(scope.getState($authTitle)).toBe('Авторизация')

    await allSettled(phoneSubmitted, { scope, params: PHONE })

    expect(scope.getState($authScreen)).toBe(AuthScreen.code)
    expect(scope.getState($authTitle)).toBe('Введите код')
    expect(scope.getState($codeSession)).toMatchObject({ phone: PHONE, issued })

    await allSettled(signInStarted, { scope, params: '123456' })

    expect(scope.getState($authScreen)).toBe(AuthScreen.success)
    expect(scope.getState($authTitle)).toBeNull()
    expect(scope.getState($closeRequested)).toBe(true)
  })

  it('неверный код ведёт на экран ошибки без шапки', async () => {
    const scope = createScope(401)

    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(signInStarted, { scope, params: '000000' })

    expect(scope.getState($authScreen)).toBe(AuthScreen.error)
    expect(scope.getState($authTitle)).toBeNull()
    expect(scope.getState($closeRequested)).toBe(false)
  })

  it('«Изменить номер» позволяет войти с другим телефоном', async () => {
    const signIn = vi.fn(async () => ({ status: 200, data: undefined }))
    const scope = fork({
      handlers: [
        [requestCodeFx, async () => ({ status: 200, data: issued })],
        [signInFx, signIn],
        [requestMeFx, async () => ({ status: 200, data: { id: '1' } })],
        [waitSignInFx, async <T>(wait: T) => wait],
      ],
    })

    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(backToPhone, { scope })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)

    await allSettled(phoneSubmitted, { scope, params: OTHER_PHONE })
    await allSettled(signInStarted, { scope, params: '123456' })

    expect(signIn).toHaveBeenCalledWith({
      phoneNumber: '375332222222',
      code: '123456',
    })
  })

  it('повторное открытие после успешного входа начинает с чистого листа', async () => {
    const scope = createScope()

    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(signInStarted, { scope, params: '123456' })
    await allSettled(authFlowReset, { scope })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
    expect(scope.getState($closeRequested)).toBe(false)
    expect(scope.getState($codeSession).phone).toBe('')
  })

  it('после сброса весь сценарий проходит заново', async () => {
    const scope = createScope()

    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(signInStarted, { scope, params: '123456' })
    await allSettled(authFlowReset, { scope })
    await allSettled(phoneSubmitted, { scope, params: PHONE })
    await allSettled(signInStarted, { scope, params: '123456' })

    expect(scope.getState($closeRequested)).toBe(true)
  })
})
