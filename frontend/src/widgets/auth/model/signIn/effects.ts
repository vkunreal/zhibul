import { createEffect } from 'effector'

import { SignInWait } from './interfaces'
import { remainingLoadingMs } from './utils'

/**
 * Таймер анимации. Сеть не трогает, только ждёт остаток MIN_LOADING_MS и
 * возвращает то, что получил.
 *
 * Если запрос шёл MIN_LOADING_MS или дольше, отвечает без таймера: даже
 * setTimeout(0) добавил бы к загрузке лишний тик.
 */
export const waitSignInFx = createEffect(async (wait: SignInWait) => {
  const delay = remainingLoadingMs(wait.startedAt, Date.now())

  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  return wait
})
