import { MIN_LOADING_MS } from './constants'

/** Сколько ещё держать анимацию входа, чтобы она шла не меньше MIN_LOADING_MS. */
export const remainingLoadingMs = (startedAt: number, now: number) =>
  Math.max(0, MIN_LOADING_MS - (now - startedAt))
