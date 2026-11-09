import type { Request } from 'express'

const pathnameOf = (request: Request) => {
  const raw = request.originalUrl || request.url || request.path || ''

  return raw.split('?')[0]
}

const zoneOf = (request: Request) => {
  const parts = pathnameOf(request).split('/').filter(Boolean)
  const apiAt = parts.indexOf('api')

  return apiAt >= 0 ? parts[apiAt + 1] : undefined
}

export const isUnauthPath = (request: Request) => zoneOf(request) === 'unauth'

export const isPublicPath = (request: Request) => zoneOf(request) === 'public'

export const isAdminPath = (request: Request) => zoneOf(request) === 'admin'
