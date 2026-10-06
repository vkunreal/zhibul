import type { Request } from 'express'
import type { AuthRequestContext } from '../../application/auth.types'

export const requestContext = (req: Request): AuthRequestContext => {
  const forwarded = req.headers['x-forwarded-for']
  const ip =
    typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : req.ip

  return {
    ip,
    userAgent: req.headers['user-agent'],
  }
}
