import { CodeSession } from './interfaces'

export const SECOND_MS = 1000

/** Сессия до выдачи SMS. Шаг кода в это время не показывается. */
export const EMPTY_CODE_SESSION: CodeSession = {
  phone: '',
  issued: { ttl: 0, length: 0 },
  expiresAt: 0,
}
