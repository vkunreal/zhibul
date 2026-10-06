import { applyDecorators, SetMetadata } from '@nestjs/common'

export const AUTH_KEY = 'auth'
export const ROLES_KEY = 'roles'

export const Auth = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(AUTH_KEY, true),
    ...(roles.length > 0 ? [SetMetadata(ROLES_KEY, roles)] : []),
  )
