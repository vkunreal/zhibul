import { AUTH_SCREEN_TITLE } from './constants'
import { AuthScreen } from './interfaces'

/** Заголовок шапки для экрана или null, если шапки на нём нет. */
export const screenTitle = (screen: AuthScreen) => {
  if (screen === AuthScreen.phone || screen === AuthScreen.code) {
    return AUTH_SCREEN_TITLE[screen]
  }

  return null
}
