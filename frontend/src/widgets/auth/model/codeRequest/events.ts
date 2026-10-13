import { createEvent } from 'effector'

import { PhoneAttempt } from './interfaces'

/** Пользователь отправил валидный номер (с маской). Команда UI, запускает запрос SMS. */
export const phoneSubmitted = createEvent<string>()

/** Отправка номера прошла защиту от повторного сабмита и получила номер попытки. */
export const phoneAccepted = createEvent<PhoneAttempt>()

/** Запрос SMS текущей попытки упал со статусом больше 500. */
export const serverError = createEvent()
