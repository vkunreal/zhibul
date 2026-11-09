import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { AuthService } from '../../../../application/auth.service'
import { authenticateAccess } from '../utils/authenticate-access'

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    await authenticateAccess(request, this.jwtService, this.authService)

    return true
  }
}
