import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { $token } from '@shared/auth'
import { navigateFx } from '@shared/navigation'

import { formSubmitted, loginFx } from '../model'

describe('login model', () => {
  it('при валидной форме логинит и пишет токен', async () => {
    const navigated: string[] = []
    const scope = fork({
      handlers: [
        [loginFx, async () => 'token-123'],
        [
          navigateFx,
          async (path: string) => {
            navigated.push(path)
          },
        ],
      ],
    })

    await allSettled(formSubmitted, {
      scope,
      params: { name: 'admin', password: 'secret' },
    })

    expect(scope.getState($token)).toBe('token-123')
    expect(navigated).toContain('/home')
  })

  it('не логинит при пустых полях', async () => {
    let loginCalled = false
    const scope = fork({
      values: [[$token, '']],
      handlers: [
        [
          loginFx,
          async () => {
            loginCalled = true
            return 'nope'
          },
        ],
        [navigateFx, async () => undefined],
      ],
    })

    await allSettled(formSubmitted, {
      scope,
      params: { name: '  ', password: '' },
    })

    expect(loginCalled).toBe(false)
    expect(scope.getState($token)).toBe('')
  })
})
