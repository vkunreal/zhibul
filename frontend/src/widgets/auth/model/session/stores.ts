import { combine, createStore } from 'effector'

import { authFlowReset } from '../lifecycle'
import { EMPTY_CODE_SESSION } from './constants'
import { backToPhone, codeIssued } from './events'
import { IssuedCode } from './interfaces'
import { codeExpiresAt } from './utils'

// Все три стора живут от codeIssued до backToPhone или authFlowReset.

/** Телефон с маской. Для запросов из него берутся только цифры (digitsOnly). */
export const $phoneNumber = createStore('')
  .on(codeIssued, (_, { phone }) => phone)
  .reset(backToPhone, authFlowReset)

const $issuedCode = createStore<IssuedCode | null>(null)
  .on(codeIssued, (_, { issued }) => issued)
  .reset(backToPhone, authFlowReset)

/**
 * Абсолютный момент истечения кода. Хранится временем, а не остатком секунд,
 * чтобы таймер не начинался заново, когда модалка перестраивается между
 * шторкой и диалогом.
 */
const $expiresAt = createStore<number | null>(null)
  .on(codeIssued, (_, { issued }) => codeExpiresAt(Date.now(), issued.ttl))
  .reset(backToPhone, authFlowReset)

/**
 * Данные шага кода одним объектом. Пока SMS не выдана — EMPTY_CODE_SESSION:
 * шаг кода в это время не на экране, так что заглушку никто не увидит.
 */
export const $codeSession = combine(
  $phoneNumber,
  $issuedCode,
  $expiresAt,
  (phone, issued, expiresAt) => {
    if (!issued || expiresAt == null) return EMPTY_CODE_SESSION

    return { phone, issued, expiresAt }
  },
)
