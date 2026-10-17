import { createEffect } from 'effector'
import { UNSAFE_createBrowserHistory as createBrowserHistory } from 'react-router'

export const history = createBrowserHistory({ v5Compat: true })

export const navigateFx = createEffect((path: string) => {
  history.push(path)
})
