export interface TokenCouple {
  accessToken: string
  refreshToken: string
}

export interface AuthCredentials {
  phoneNumber: string
  code: string
}

export interface AuthRequestContext {
  userAgent?: string
  ip?: string
}

export interface AuthenticatedUser {
  id: string
  sessionId: string
  roles: string[]
}

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type Role = (typeof Role)[keyof typeof Role]
