import { AuthScreen } from './interfaces'

/** Заголовки шапки. У анимации и экрана ошибки шапки нет. */
export const AUTH_SCREEN_TITLE = {
  [AuthScreen.phone]: 'Авторизация',
  [AuthScreen.code]: 'Введите код',
} as const
