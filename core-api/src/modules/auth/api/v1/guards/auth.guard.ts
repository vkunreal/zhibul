import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { AuthService } from '../../../application/auth.service'
import { ACCESS_TOKEN_COOKIE } from '../auth-cookies'
import { AUTH_KEY, ROLES_KEY } from '../decorators/auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiresAuth) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const token = request.cookies?.[ACCESS_TOKEN_COOKIE] as string | undefined

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string
        sid: string
      }>(token)

      request.user = await this.authService.assertActiveSession(
        payload.sid,
        payload.sub,
      )
    } catch {
      throw new UnauthorizedException()
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (requiredRoles?.length) {
      const hasRole = requiredRoles.some((role) =>
        request.user?.roles.includes(role),
      )

      if (!hasRole) {
        throw new ForbiddenException()
      }
    }

    return true
  }
}
