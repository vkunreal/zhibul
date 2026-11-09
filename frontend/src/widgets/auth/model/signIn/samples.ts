import { sample } from 'effector'

import { authEvent, signInFx } from '@/entities/auth'

import { digitsOnly } from '../lib'
import { $authScreen, $closeRequested, AuthScreen } from '../screen'
import { $phoneNumber } from '../session'
import { SIGN_IN_OK_STATUS } from './constants'
import { waitSignInFx } from './effects'
import { signInAccepted, signInSettled, signInStarted } from './events'
import { SignInWait } from './interfaces'
import { $signInAttempt, $signInPending, $signInStartedAt } from './stores'

// Шаг кода: код → вход → закрытие модалки или экран ошибки.
//
// Порядок по времени:
//   1. signInStarted: экран переключается на анимацию, запрос входа уходит сразу.
//   2. Ответ signInFx (успех или ошибка) приходит, cookie уже стоит.
//   3. waitSignInFx добирает анимацию до MIN_LOADING_MS.
//   4. Статус 200 — модалка закрывается. Всё остальное — экран ошибки.

// 1. Защита от двойного сабмита и выдача номера попытки.
sample({
  clock: signInStarted,
  source: { pending: $signInPending, attempt: $signInAttempt },
  filter: ({ pending }) => !pending,
  fn: ({ attempt }, otp) => ({ otp, attempt: attempt + 1 }),
  target: signInAccepted,
})

// 2. Код принят — сразу показываем анимацию «Авторизуем вас».
sample({
  clock: signInAccepted,
  fn: () => AuthScreen.success,
  target: $authScreen,
})

// 3. Запрос входа уходит одновременно с анимацией, она его не задерживает.
sample({
  clock: signInAccepted,
  source: $phoneNumber,
  fn: (phone, { otp }) => ({ phoneNumber: digitsOnly(phone), code: otp }),
  target: authEvent,
})

// 4. Любой исход запроса запускает добор анимации. Ответы не из 2xx
//    sendRequest превращает в fail, поэтому они, как и обрыв сети, приходят
//    сюда со status: 'fail'. signInFx живёт в entities и может сработать не
//    из модалки — без pending такой вход здесь не учитывается.
sample({
  clock: signInFx.finally,
  source: {
    pending: $signInPending,
    startedAt: $signInStartedAt,
    attempt: $signInAttempt,
  },
  filter: ({ pending }) => pending,
  fn: ({ startedAt, attempt }, outcome): SignInWait => ({
    startedAt,
    attempt,
    ok:
      outcome.status === 'done' &&
      outcome.result.status === SIGN_IN_OK_STATUS,
  }),
  target: waitSignInFx,
})

// 5. Анимация закончилась. Итог чужой попытки отбрасывается здесь.
sample({
  clock: waitSignInFx.doneData,
  source: $signInAttempt,
  filter: (attempt, wait) => attempt === wait.attempt,
  fn: (_, { ok }) => ok,
  target: signInSettled,
})

// 6a. Успех — AuthModal увидит $closeRequested и вызовет onClose.
sample({
  clock: signInSettled,
  filter: (ok) => ok,
  fn: () => true,
  target: $closeRequested,
})

// 6b. Неуспех — экран ошибки с кнопкой закрытия.
sample({
  clock: signInSettled,
  filter: (ok) => !ok,
  fn: () => AuthScreen.error,
  target: $authScreen,
})
