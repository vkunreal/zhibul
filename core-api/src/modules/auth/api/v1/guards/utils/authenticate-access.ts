import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { AuthService } from '../../../../application/auth.service'
import { ACCESS_TOKEN_COOKIE } from '../../auth-cookies'

export const authenticateAccess = async (
  request: Request,
  jwtService: JwtService,
  authService: AuthService,
) => {
  const token = request.cookies?.[ACCESS_TOKEN_COOKIE] as string | undefined

  if (!token) {
    throw new UnauthorizedException()
  }

  try {
    const payload = await jwtService.verifyAsync<{
      sub: string
      sid: string
    }>(token)

    request.user = await authService.assertActiveSession(
      payload.sid,
      payload.sub,
    )
  } catch {
    throw new UnauthorizedException()
  }

  return request.user
}
