/** Принятая отправка кода. attempt отличает этот вход от старых. */
export interface SignInAttempt {
  otp: string
  attempt: number
}

/** Что ждёт анимация входа: момент старта, номер попытки и успех ответа. */
export interface SignInWait {
  /** Момент старта анимации (`Date.now()`-шкала). */
  startedAt: number
  attempt: number
  /** Сервер ответил статусом 200. */
  ok: boolean
}
