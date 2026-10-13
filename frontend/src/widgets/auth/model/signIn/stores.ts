import { createStore } from 'effector'

import { authFlowReset } from '../lifecycle'
import { signInAccepted, signInSettled } from './events'

/**
 * Пока идёт вход и анимация, повторный сабмит кода игнорируется. OTP-инпут
 * отправляет форму сам на последней цифре, так что дубль вполне реален.
 */
export const $signInPending = createStore(false)
  .on(signInAccepted, () => true)
  .on(signInSettled, () => false)
  .reset(authFlowReset)

/** Момент старта анимации, от него считается остаток MIN_LOADING_MS. */
export const $signInStartedAt = createStore(0).on(signInAccepted, () =>
  Date.now(),
)

/**
 * Номер последней принятой попытки. authFlowReset тоже двигает его: модалку
 * могли закрыть и открыть заново, пока шла анимация, и старый итог не должен
 * закрыть новую модалку.
 */
export const $signInAttempt = createStore(0)
  .on(signInAccepted, (_, { attempt }) => attempt)
  .on(authFlowReset, (attempt) => attempt + 1)
