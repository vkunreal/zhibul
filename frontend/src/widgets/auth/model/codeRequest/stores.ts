import { createStore } from 'effector'

import { authFlowReset } from '../lifecycle'
import { phoneAccepted } from './events'

/**
 * Номер последней принятой попытки. authFlowReset тоже двигает его: ответы
 * на запросы, отправленные до сброса, перестают совпадать и отбрасываются.
 */
export const $codeAttempt = createStore(0)
  .on(phoneAccepted, (_, { attempt }) => attempt)
  .on(authFlowReset, (attempt) => attempt + 1)

/** Пока SMS запрашивается, повторный сабмит номера игнорируется. */
export const $codePending = createStore(false)
  .on(phoneAccepted, () => true)
  .reset(authFlowReset)
