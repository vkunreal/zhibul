import { createStore } from 'effector'

import { authFlowReset } from '../lifecycle'
import { backToPhone, codeIssued } from '../session'
import { AuthScreen } from './interfaces'
import { screenTitle } from './utils'

/**
 * Текущий экран модалки.
 *
 * Переходы, которые задаются здесь:
 *   phone → code       codeIssued, сервер выдал SMS
 *   code  → phone      backToPhone, «Изменить номер»
 *   любой → phone      authFlowReset
 *
 * Переходы, которые задают папки запросов через sample:
 *   phone   → error    codeRequest, запрос SMS упал с 5xx
 *   code    → success  signIn, код принят и отправлен на проверку
 *   success → error    signIn, вход не удался
 */
export const $authScreen = createStore(AuthScreen.phone)
  .on(codeIssued, () => AuthScreen.code)
  .on(backToPhone, () => AuthScreen.phone)
  .reset(authFlowReset)

/** Заголовок шапки. На анимации и ошибке шапки нет, поэтому null. */
export const $authTitle = $authScreen.map(screenTitle)

/**
 * Сигнал AuthModal вызвать onClose. Поднимает его signIn после успешного
 * входа. Сбрасывается до следующего открытия, иначе модалка закроется сразу.
 */
export const $closeRequested = createStore(false).reset(authFlowReset)
