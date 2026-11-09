import { sample } from 'effector'

import { isServerError } from '@/shared/api'

import { digitsOnly } from '../lib'
import { $authScreen, AuthScreen } from '../screen'
import { codeIssued, IssuedCode } from '../session'
import { requestCodeFx } from './effects'
import { phoneAccepted, phoneSubmitted, serverError } from './events'
import { CodeRequest } from './interfaces'
import { $codeAttempt, $codePending } from './stores'

// Шаг телефона: номер → запрос SMS → шаг кода или экран ошибки.
//
// Каждая отправка номера получает номер попытки. Ответ применяется, только
// если его попытка всё ещё текущая. Так ответ на запрос, отправленный до
// закрытия модалки, не откроет шаг кода в новой сессии.

// 1. Защита от двойного сабмита и выдача номера попытки.
sample({
  clock: phoneSubmitted,
  source: { pending: $codePending, attempt: $codeAttempt },
  filter: ({ pending }) => !pending,
  fn: ({ attempt }, phone) => ({ phone, attempt: attempt + 1 }),
  target: phoneAccepted,
})

// 2. Запрос SMS уходит сразу после принятия.
sample({
  clock: phoneAccepted,
  fn: ({ phone, attempt }): CodeRequest => ({
    phone,
    phoneNumber: digitsOnly(phone),
    attempt,
  }),
  target: requestCodeFx,
})

// 3. Запрос текущей попытки завершился — номер снова можно отправить.
sample({
  clock: requestCodeFx.finally,
  source: $codeAttempt,
  filter: (attempt, { params }) => attempt === params.attempt,
  fn: () => false,
  target: $codePending,
})

// 4. SMS выдана — сессия запоминает телефон в том виде, как его ввели,
//    и открывается шаг кода. Ответ без данных считаем невыданным кодом.
sample({
  clock: requestCodeFx.done,
  source: $codeAttempt,
  filter: (attempt, { params, result }) =>
    attempt === params.attempt && result.data != null,
  fn: (_, { params, result }) => ({
    phone: params.phone,
    issued: result.data as IssuedCode,
  }),
  target: codeIssued,
})

// 5. Статус больше 500 — экран ошибки. Остальные ошибки (4xx, обрыв сети)
//    оставляют пользователя на форме телефона.
sample({
  clock: requestCodeFx.fail,
  source: $codeAttempt,
  filter: (attempt, { params, error }) =>
    attempt === params.attempt && isServerError(error),
  target: serverError,
})

// 6. Серверная ошибка переключает модалку на экран «Что-то пошло не так».
sample({
  clock: serverError,
  fn: () => AuthScreen.error,
  target: $authScreen,
})
