import type { Request } from 'express'
import type { AuthenticatedUser } from 'src/modules/auth/application/auth.types'

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser
  }
}

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser
}
