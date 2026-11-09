import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import type { Request } from 'express'
import { isUnauthPath } from '../utils/route-zone'

@Injectable()
export class UnauthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    return isUnauthPath(request)
  }
}
