import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'
import { AUTH_KEY, ROLES_KEY } from '../decorators/auth.decorator'
import { isAdminPath, isPublicPath } from './utils/route-zone'
import { AdminGuard } from './zones/admin.guard'
import { PublicGuard } from './zones/public.guard'
import { UnauthGuard } from './zones/unauth.guard'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly unauthGuard: UnauthGuard,
    private readonly publicGuard: PublicGuard,
    private readonly adminGuard: AdminGuard,
  ) {}

  /*
    Перед каждым запросом смотрит сегмент пути сразу после /api.

      unauth    сессия не нужна
      admin     живая сессия и роль ADMIN
      public    живая сессия, пользователь попадает в request.user
      @Auth()   то же, что public, и роли с декоратора, если они указаны

    Ручки вне этих зон и без @Auth() проходят как есть. Так живёт healthCheck.
  */
  async canActivate(context: ExecutionContext) {
    // Код, вход, восстановление доступа. Куку не читаем.
    if (this.unauthGuard.canActivate(context)) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()

    // Нет сессии — 401, сессия без роли ADMIN — 403.
    if (isAdminPath(request)) {
      return this.adminGuard.canActivate(context)
    }

    // Зона public либо метка @Auth(). Метка метода перекрывает метку класса.
    const requiresAuth =
      isPublicPath(request) ||
      this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

    if (!requiresAuth) {
      return true
    }

    // Проверяет куку и кладёт пользователя в request.user.
    await this.publicGuard.canActivate(context)

    // Роли из @Auth(Role.ADMIN). Список пуст — хватает самого входа.
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
