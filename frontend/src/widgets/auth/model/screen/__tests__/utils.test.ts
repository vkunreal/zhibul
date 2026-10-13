import { describe, expect, it } from 'vitest'

import { AuthScreen } from '../interfaces'
import { screenTitle } from '../utils'

describe('screenTitle', () => {
  it('на шаге телефона — «Авторизация»', () => {
    expect(screenTitle(AuthScreen.phone)).toBe('Авторизация')
  })

  it('на шаге кода — «Введите код»', () => {
    expect(screenTitle(AuthScreen.code)).toBe('Введите код')
  })

  it('на анимации и экране ошибки шапки нет', () => {
    expect(screenTitle(AuthScreen.success)).toBeNull()
    expect(screenTitle(AuthScreen.error)).toBeNull()
  })
})
