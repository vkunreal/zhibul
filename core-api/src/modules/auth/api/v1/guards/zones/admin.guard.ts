import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { AuthService } from '../../../../application/auth.service'
import { Role } from '../../../../application/auth.types'
import { authenticateAccess } from '../utils/authenticate-access'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const user = await authenticateAccess(
      request,
      this.jwtService,
      this.authService,
    )

    if (!user?.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException()
    }

    return true
  }
}
