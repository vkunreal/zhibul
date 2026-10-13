import { createEvent } from 'effector'

import { SignInAttempt } from './interfaces'

/** Пользователь ввёл код из SMS (только цифры). Команда UI, запускает вход. */
export const signInStarted = createEvent<string>()

/** Отправка кода прошла защиту от повторного сабмита и получила номер попытки. */
export const signInAccepted = createEvent<SignInAttempt>()

/** Анимация текущей попытки закончилась. true — вход удался. */
export const signInSettled = createEvent<boolean>()
