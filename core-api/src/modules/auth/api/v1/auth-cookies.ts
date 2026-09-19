import { CookieOptions, Response } from 'express'
import type { TokenCouple } from '../../application/auth.types'

export const ACCESS_TOKEN_COOKIE = 'accessToken'
export const REFRESH_TOKEN_COOKIE = 'refreshToken'

const cookieBase = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
})

export const setAuthCookies = (
  res: Response,
  tokens: TokenCouple,
  accessMaxAgeMs: number,
  refreshMaxAgeMs: number,
) => {
  const base = cookieBase()

  res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...base,
    maxAge: accessMaxAgeMs,
  })
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...base,
    maxAge: refreshMaxAgeMs,
  })
}

export const clearAuthCookies = (res: Response) => {
  const base = cookieBase()

  res.clearCookie(ACCESS_TOKEN_COOKIE, base)
  res.clearCookie(REFRESH_TOKEN_COOKIE, base)
}
