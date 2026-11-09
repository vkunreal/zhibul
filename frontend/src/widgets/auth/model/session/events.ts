import { createEvent } from 'effector'

import { CodeIssuedPayload } from './interfaces'

/**
 * Сервер выдал SMS для текущей попытки. Вызывает его codeRequest, а screen
 * и сессия по нему открывают шаг кода и запоминают данные.
 */
export const codeIssued = createEvent<CodeIssuedPayload>()

/** «Изменить номер» на шаге кода: назад к телефону, сессия кода стирается. */
export const backToPhone = createEvent()
