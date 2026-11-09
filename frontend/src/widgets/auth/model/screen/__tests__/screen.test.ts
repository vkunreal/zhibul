import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { $authScreen, $authTitle, $closeRequested, AuthScreen } from '../index'

import { authFlowReset } from '../../lifecycle'
import { backToPhone, codeIssued } from '../../session'

const issuedPayload = {
  phone: '+375 (29) 111-11-11',
  issued: { ttl: 60, length: 6 },
}

describe('экран модалки', () => {
  it('открывается на шаге телефона с заголовком «Авторизация»', () => {
    const scope = fork()

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
    expect(scope.getState($authTitle)).toBe('Авторизация')
    expect(scope.getState($closeRequested)).toBe(false)
  })

  it('после выдачи SMS переходит на шаг кода', async () => {
    const scope = fork()

    await allSettled(codeIssued, { scope, params: issuedPayload })

    expect(scope.getState($authScreen)).toBe(AuthScreen.code)
    expect(scope.getState($authTitle)).toBe('Введите код')
  })

  it('по «Изменить номер» возвращается к телефону', async () => {
    const scope = fork({ values: [[$authScreen, AuthScreen.code]] })

    await allSettled(backToPhone, { scope })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('сброс возвращает шаг телефона с любого экрана', async () => {
    const scope = fork({ values: [[$authScreen, AuthScreen.error]] })

    await allSettled(authFlowReset, { scope })

    expect(scope.getState($authScreen)).toBe(AuthScreen.phone)
  })

  it('сброс снимает сигнал закрытия, чтобы модалка не закрылась при следующем открытии', async () => {
    const scope = fork({ values: [[$closeRequested, true]] })

    await allSettled(authFlowReset, { scope })

    expect(scope.getState($closeRequested)).toBe(false)
  })
})
