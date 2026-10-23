import { createEvent, createStore } from 'effector'

const TOKEN_KEY = 'token'

const readToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) return token

  try {
    const persisted = localStorage.getItem('persist:root')
    if (!persisted) return ''

    const variables = JSON.parse(JSON.parse(persisted).variables ?? '{}')
    return typeof variables.token === 'string' ? variables.token : ''
  } catch {
    return ''
  }
}

export const sessionCleared = createEvent()

export const $token = createStore(readToken()).on(sessionCleared, () => '')

$token.watch((token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
})

sessionCleared.watch(() => {
  localStorage.clear()
})
