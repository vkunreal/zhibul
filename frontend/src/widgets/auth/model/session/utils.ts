import { SECOND_MS } from './constants'

/** Абсолютный момент истечения кода, который живёт ttl секунд начиная с now. */
export const codeExpiresAt = (now: number, ttl: number) => now + ttl * SECOND_MS
