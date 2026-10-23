import { createEvent, createStore } from 'effector'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('auth token persistence', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('читает token из localStorage', async () => {
    localStorage.setItem('token', 'from-storage')
    const { $token } = await import('../index')
    expect($token.getState()).toBe('from-storage')
  })

  it('читает legacy persist:root при отсутствии token', async () => {
    localStorage.setItem(
      'persist:root',
      JSON.stringify({
        variables: JSON.stringify({ token: 'legacy-token' }),
      }),
    )
    const { $token } = await import('../index')
    expect($token.getState()).toBe('legacy-token')
  })

  it('sessionCleared стирает токен и localStorage', async () => {
    localStorage.setItem('token', 'expired')
    localStorage.setItem(
      'persist:root',
      JSON.stringify({ variables: JSON.stringify({ token: 'expired' }) }),
    )
    const { $token, sessionCleared } = await import('../index')

    sessionCleared()

    expect($token.getState()).toBe('')
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('persist:root')).toBeNull()
  })

  it('сохраняет и удаляет token при изменении стора', () => {
    const setToken = createEvent<string>()
    const $local = createStore('').on(setToken, (_, token) => token)

    $local.watch((token) => {
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    })

    setToken('abc')
    expect(localStorage.getItem('token')).toBe('abc')

    setToken('')
    expect(localStorage.getItem('token')).toBeNull()
  })
})
